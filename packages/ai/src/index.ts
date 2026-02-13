import OpenAI from 'openai';

export interface BuildPromptInput {
  docType: string;
  sectionPath: string;
  ragSnippets: string[];
  corrections: string[];
  formInputs: Record<string, string | number | boolean | null>;
}

export interface DraftOutput {
  sectionPath: string;
  format: 'json' | 'html';
  content: string;
  marks: Array<{ key: string; source: string }>;
}

export const buildPrompt = ({
  docType,
  sectionPath,
  ragSnippets,
  corrections,
  formInputs,
}: BuildPromptInput): string => {
  const formLines = Object.entries(formInputs)
    .map(([key, value]) => `- ${key}: ${value ?? '[[חסר: לא נמסר]]'}`)
    .join('\n');

  return [
    `You are drafting a Hebrew ${docType} section for: ${sectionPath}.`,
    'Use factual data only. If a required fact is missing, emit placeholder [[חסר: תיאור החסר]].',
    'Return output as strict JSON with fields: sectionPath, html, facts.',
    'Wrap grounded facts in <mark data-source="...">value</mark> for UI highlighting.',
    'RAG snippets:',
    ...ragSnippets.map((snippet, index) => `${index + 1}. ${snippet}`),
    'Corrections to apply:',
    ...corrections.map((correction, index) => `${index + 1}. ${correction}`),
    'Form inputs:',
    formLines || '- [[חסר: אין קלט טופס]]',
  ].join('\n');
};

const getClient = (): OpenAI => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY env var');
  }

  return new OpenAI({ apiKey });
};

export const generateSectionDraft = async (
  input: BuildPromptInput,
  model = process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini',
): Promise<DraftOutput> => {
  const prompt = buildPrompt(input);
  const client = getClient();
  const completion = await client.responses.create({
    model,
    input: prompt,
    text: {
      format: {
        type: 'json_schema',
        name: 'section_draft',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            sectionPath: { type: 'string' },
            html: { type: 'string' },
            facts: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  key: { type: 'string' },
                  source: { type: 'string' },
                },
                required: ['key', 'source'],
              },
            },
          },
          required: ['sectionPath', 'html', 'facts'],
        },
      },
    },
  });

  const text = completion.output_text;
  const parsed = JSON.parse(text) as { sectionPath: string; html: string; facts: DraftOutput['marks'] };

  return {
    sectionPath: parsed.sectionPath,
    format: 'html',
    content: parsed.html,
    marks: parsed.facts,
  };
};

export const generateFullDraftBySections = async (
  sections: BuildPromptInput[],
): Promise<{ format: 'json'; sections: DraftOutput[] }> => {
  const outputs: DraftOutput[] = [];

  for (const section of sections) {
    outputs.push(await generateSectionDraft(section));
  }

  return {
    format: 'json',
    sections: outputs,
  };
};
