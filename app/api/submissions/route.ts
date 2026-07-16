import { NextResponse } from "next/server";
import {
  getSubmissions,
  deleteSubmission,
} from "@/lib/submissions";

export const dynamic = "force-dynamic";

export async function GET() {
  const submissions = await getSubmissions();
  return NextResponse.json(submissions, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Missing id." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
  const ok = await deleteSubmission(id);
  return NextResponse.json(
    { success: ok },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
