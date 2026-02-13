import { NextResponse } from "next/server";

import { createAuthAdapter } from "@repo/auth";
import { ingestPdf } from "@repo/ingestion";

export async function POST(request: Request) {
  const auth = createAuthAdapter();
  const user = await auth.getCurrentUser();
  const formData = await request.formData();
  const docType = String(formData.get("doc_type") ?? "");
  const file = formData.get("pdf");

  if (!docType || !(file instanceof File)) {
    return NextResponse.json({ error: "doc_type and pdf are required" }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const result = await ingestPdf({
    userId: user.id,
    docType,
    fileName: file.name,
    bytes
  });

  return NextResponse.json(result, { status: 201 });
}
