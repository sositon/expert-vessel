import { DraftEditor } from "./tiptap-editor";

export default async function DraftByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="container mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">טיוטה #{id}</h1>
      <DraftEditor draftId={id} />
    </main>
  );
}
