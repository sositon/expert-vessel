import type { RetrievalContext } from "@repo/db";

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
