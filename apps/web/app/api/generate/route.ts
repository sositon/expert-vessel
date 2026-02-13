import { NextResponse } from "next/server";

import { generateDraft } from "@repo/ai";
import { createAuthAdapter } from "@repo/auth";
import { retrieveContextForDraftGeneration } from "@repo/db";

export async function POST(request: Request) {
  const auth = createAuthAdapter();
  const user = await auth.getCurrentUser();
  const body = (await request.json()) as { notes?: string; formInput?: string };

  const notes = body.notes?.trim() ?? "";
  const formInput = body.formInput?.trim() ?? "";

  if (!notes || !formInput) {
    return NextResponse.json({ error: "notes and formInput are required" }, { status: 400 });
  }

  const context = await retrieveContextForDraftGeneration(user.id, notes, formInput);
  const draft = await generateDraft(context);

  return NextResponse.json({ draft }, { status: 200 });
}
