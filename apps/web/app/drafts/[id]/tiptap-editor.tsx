"use client";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type DraftEditorProps = {
  draftId: string;
};

export function DraftEditor({ draftId }: DraftEditorProps) {
  const [status, setStatus] = useState("");
  const initialText = "טיוטה ראשונית...";

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Placeholder.configure({ placeholder: "כתוב כאן..." })],
    content: `<p>${initialText}</p>`,
    editorProps: {
      attributes: {
        class: "min-h-72 rounded-md border p-3"
      }
    }
  });

  async function onSaveCorrection() {
    if (!editor) {
      return;
    }

    const response = await fetch("/api/corrections", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        draftId,
        before: initialText,
        after: editor.getText()
      })
    });

    const payload = (await response.json()) as { error?: string; correctionId?: string };
    setStatus(response.ok ? `נשמר תיקון: ${payload.correctionId}` : payload.error ?? "שגיאה");
  }

  return (
    <div className="space-y-3">
      <EditorContent editor={editor} />
      <Button type="button" onClick={onSaveCorrection}>
        שמור תיקון
      </Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}
