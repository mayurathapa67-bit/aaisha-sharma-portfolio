import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid body." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  const expected = process.env.ADMIN_PASSWORD ?? "aaisha2025";
  if (body.password === expected) {
    return NextResponse.json(
      { success: true, token: expected },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401, headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
