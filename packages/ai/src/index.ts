import type { RetrievalContext } from "@packages/db";

export async function generateDraft(context: RetrievalContext): Promise<string> {
  return [
    "טיוטה אוטומטית:",
    "",
    "הערות:",
    context.notes,
    "",
    "נתוני טופס:",
    context.formInput
  ].join("\n");
}
