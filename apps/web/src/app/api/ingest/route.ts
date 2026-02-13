import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { createServerServiceRoleClient } from '@repo/db';
import { ingestPdfDocument } from '@repo/ingestion';
import { NextResponse } from 'next/server';

import { getCurrentUserId } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const docType = String(form.get('docType') ?? 'general');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing PDF file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempPath = join(tmpdir(), `${Date.now()}-${file.name}`);
    await writeFile(tempPath, buffer);

    const client = createServerServiceRoleClient();
    const result = await ingestPdfDocument(client, {
      pdfPath: tempPath,
      docType,
      userId: getCurrentUserId(),
      title: file.name,
    });

    await unlink(tempPath).catch(() => undefined);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ingestion failed' },
      { status: 500 },
    );
  }
}
