import { NextResponse } from "next/server";

import { createAuthAdapter } from "@repo/auth";
import { saveCorrection } from "@repo/db";

function createLineDiff(before: string, after: string): string {
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");
  const rows: string[] = [];
  const lineCount = Math.max(beforeLines.length, afterLines.length);

  for (let index = 0; index < lineCount; index += 1) {
    const previous = beforeLines[index] ?? "";
    const current = afterLines[index] ?? "";
    if (previous !== current) {
      rows.push(`- ${previous}`);
      rows.push(`+ ${current}`);
    }
  }

  return rows.join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json()) as { draftId?: string; before?: string; after?: string };

  if (!body.draftId || typeof body.before !== "string" || typeof body.after !== "string") {
    return NextResponse.json({ error: "draftId, before, after are required" }, { status: 400 });
  }

  const auth = createAuthAdapter();
  const user = await auth.getCurrentUser();
  const diff = createLineDiff(body.before, body.after);

  const correction = await saveCorrection({
    userId: user.id,
    draftId: body.draftId,
    before: body.before,
    after: body.after,
    diff
  });

  return NextResponse.json({ correctionId: correction.id, diff: correction.diff }, { status: 201 });
}
