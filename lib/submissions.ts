import { promises as fs } from "fs";
import path from "path";

export interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SubmissionInput {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "submissions.json");

const memory: Submission[] = [];

async function readFile(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch {
    return memory;
  }
}

async function writeFile(items: Submission[]): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(items, null, 2), "utf8");
  } catch {
    memory.length = 0;
    memory.push(...items);
  }
}

export async function addSubmission(input: SubmissionInput): Promise<Submission> {
  const submission: Submission = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: input.name?.trim() ?? "Anonymous",
    email: input.email?.trim() ?? "",
    subject: input.subject?.trim() ?? "",
    message: input.message?.trim() ?? "",
    createdAt: new Date().toISOString(),
  };
  const items = await readFile();
  items.unshift(submission);
  await writeFile(items);
  return submission;
}

export async function getSubmissions(): Promise<Submission[]> {
  return readFile();
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const items = await readFile();
  const next = items.filter((s) => s.id !== id);
  if (next.length === items.length) return false;
  await writeFile(next);
  return true;
}
