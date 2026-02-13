import { createServerServiceRoleClient, vectorSearchChunks } from '@repo/db';
import { generateSectionDraft } from '@repo/ai';
import { embedTexts } from '@repo/ingestion';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const bodySchema = z.object({
  docType: z.string().min(1),
  sectionPath: z.string().min(1),
  notes: z.string().default(''),
  formInputs: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])),
});

export async function POST(request: Request) {
  try {
    const parsedBody = bodySchema.parse(await request.json());
    const [queryEmbedding] = await embedTexts([parsedBody.notes || parsedBody.sectionPath]);

    const client = createServerServiceRoleClient();
    const matches = await vectorSearchChunks(client, queryEmbedding ?? [], {
      docType: parsedBody.docType,
      limit: 6,
    });

    const draft = await generateSectionDraft({
      docType: parsedBody.docType,
      sectionPath: parsedBody.sectionPath,
      ragSnippets: matches.map((match) => match.content),
      corrections: [],
      formInputs: parsedBody.formInputs,
    });

    return NextResponse.json({ draft, matchesCount: matches.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 },
    );
  }
}
