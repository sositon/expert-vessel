import { createServerServiceRoleClient } from '@repo/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getCurrentUserId } from '@/lib/auth';
import { createSimpleDiff } from '@/lib/diff';

export const runtime = 'nodejs';

const bodySchema = z.object({
  draftId: z.string().min(1),
  before: z.string(),
  after: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    const client = createServerServiceRoleClient();

    const { data, error } = await client.from('corrections').insert({
      user_id: getCurrentUserId(),
      correction_text: body.after,
      archive_id: null,
      vessel_id: null,
      metadata: {
        draftId: body.draftId,
        diff: createSimpleDiff(body.before, body.after),
      },
    }).select().single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ correction: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Saving correction failed' },
      { status: 500 },
    );
  }
}
