import { NextResponse } from "next/server";

import { createAuthAdapter } from "@repo/auth";
import { saveCorrection } from "@repo/db";

function buildLineDiff(before: string, after: string): string {
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");
  const longest = Math.max(beforeLines.length, afterLines.length);
  const rows: string[] = [];

  for (let index = 0; index < longest; index += 1) {
    const oldLine = beforeLines[index] ?? "";
    const newLine = afterLines[index] ?? "";
    if (oldLine !== newLine) {
      rows.push(`- ${oldLine}`);
      rows.push(`+ ${newLine}`);
    }
  }

  return rows.join("\n");
}

export async function POST(request: Request) {
  const auth = createAuthAdapter();
  const user = await auth.getCurrentUser();
  const body = (await request.json()) as {
    draftId?: string;
    before?: string;
    after?: string;
  };

  if (!body.draftId || typeof body.before !== "string" || typeof body.after !== "string") {
    return NextResponse.json({ error: "draftId, before, after are required" }, { status: 400 });
  }

  const diff = buildLineDiff(body.before, body.after);
  const saved = await saveCorrection({
    userId: user.id,
    draftId: body.draftId,
    before: body.before,
    after: body.after,
    diff
  });

  return NextResponse.json({ correctionId: saved.id, diff: saved.diff }, { status: 201 });
}
