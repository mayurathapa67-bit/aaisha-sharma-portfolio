import { NextResponse } from "next/server";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { getContentFromStore, saveContentToStore } from "@/lib/content-store";
import type { SiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const content = await getContentFromStore();
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}

export async function PUT(request: Request) {
  if (!checkAuth(request)) return unauthorized();
  let body: SiteContent;
  try {
    body = (await request.json()) as SiteContent;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  if (!body || typeof body !== "object" || !body.nav || !body.hero) {
    return NextResponse.json(
      { error: "Invalid content structure." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  try {
    await saveContentToStore(body);
    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
