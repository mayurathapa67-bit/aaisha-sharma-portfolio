import fs from "fs";
import path from "path";
import type { SiteContent } from "./content";

const REPO = process.env.GITHUB_REPO ?? "";
const BRANCH = process.env.GITHUB_BRANCH ?? "main";
const TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_PATH = "content.json";

const LOCAL_FILE = path.join(process.cwd(), "content.json");

export interface GitHubFile {
  content: SiteContent;
  sha: string;
}

function isGitHubConfigured(): boolean {
  return Boolean(REPO && TOKEN);
}

export class ContentStoreError extends Error {}

async function readLocal(): Promise<SiteContent> {
  const raw = await fs.promises.readFile(LOCAL_FILE, "utf8");
  return JSON.parse(raw) as SiteContent;
}

async function writeLocal(content: SiteContent): Promise<void> {
  await fs.promises.writeFile(
    LOCAL_FILE,
    JSON.stringify(content, null, 2),
    "utf8"
  );
}

export async function getContentFromStore(): Promise<SiteContent> {
  if (!isGitHubConfigured()) {
    try {
      return await readLocal();
    } catch {
      throw new ContentStoreError("content.json not found locally");
    }
  }

  const [owner, repo] = REPO.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}?ref=${BRANCH}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      // fall back to local if GitHub fails
      try {
        return await readLocal();
      } catch {
        throw new ContentStoreError(
          `GitHub fetch failed (${res.status}) and no local file.`
        );
      }
    }
    const data = (await res.json()) as {
      content: string;
      sha: string;
      encoding: string;
    };
    const decoded =
      data.encoding === "base64"
        ? Buffer.from(data.content, "base64").toString("utf8")
        : data.content;
    return JSON.parse(decoded) as SiteContent;
  } catch (err) {
    if (err instanceof ContentStoreError) throw err;
    try {
      return await readLocal();
    } catch {
      throw new ContentStoreError("Failed to load content from any source.");
    }
  }
}

export async function saveContentToStore(
  content: SiteContent
): Promise<{ ok: boolean }> {
  // Always persist locally as a safety net.
  try {
    await writeLocal(content);
  } catch {
    /* ignore local write failure */
  }

  if (!isGitHubConfigured()) {
    return { ok: true };
  }

  const [owner, repo] = REPO.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`;

  // fetch current sha for optimistic concurrency
  let sha: string | undefined;
  try {
    const head = await fetch(
      `${url}?ref=${BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );
    if (head.ok) {
      const hd = (await head.json()) as { sha: string };
      sha = hd.sha;
    }
  } catch {
    /* proceed without sha */
  }

  const body = {
    message: "Update site content via admin panel",
    content: Buffer.from(JSON.stringify(content, null, 2), "utf8").toString(
      "base64"
    ),
    branch: BRANCH,
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ContentStoreError(`GitHub save failed (${res.status}): ${text}`);
  }
  return { ok: true };
}
