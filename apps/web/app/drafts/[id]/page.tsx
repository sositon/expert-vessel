import { DraftEditor } from "./editor";

export default async function DraftByIdPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="container mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">עריכת טיוטה #{id}</h1>
      <DraftEditor draftId={id} />
    </main>
  );
}
