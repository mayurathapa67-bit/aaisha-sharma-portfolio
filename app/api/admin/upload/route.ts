import { NextResponse } from "next/server";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { isCloudinaryConfigured, uploadImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized();

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  let body: { dataUrl?: string; folder?: string };
  try {
    body = (await request.json()) as { dataUrl?: string; folder?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid body." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  if (!body.dataUrl || !body.dataUrl.startsWith("data:image/")) {
    return NextResponse.json(
      { error: "A valid image data URL is required." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  try {
    const url = await uploadImage(body.dataUrl, body.folder ?? "aaisha-portfolio");
    return NextResponse.json(
      { url },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
