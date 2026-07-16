import { NextResponse } from "next/server";
import { addSubmission, type SubmissionInput } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: SubmissionInput;
  try {
    body = (await request.json()) as SubmissionInput;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  if (!body.email || !body.email.includes("@") || !body.message) {
    return NextResponse.json(
      { error: "Email and message are required." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  const submission = await addSubmission(body);
  return NextResponse.json(
    { success: true, id: submission.id },
    { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
