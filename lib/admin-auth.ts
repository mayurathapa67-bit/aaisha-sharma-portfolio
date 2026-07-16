import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function checkAuth(request: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "aaisha2025";
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;
  return auth.slice("Bearer ".length) === expected;
}

export function unauthorized() {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401, headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
