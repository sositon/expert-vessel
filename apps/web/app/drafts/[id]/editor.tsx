"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type DraftEditorProps = {
  draftId: string;
};

export function DraftEditor({ draftId }: DraftEditorProps) {
  const [message, setMessage] = useState("");
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Placeholder.configure({ placeholder: "כתוב כאן..." })],
    content: "<p>טיוטה ראשונית...</p>",
    editorProps: {
      attributes: {
        class: "min-h-64 rounded-md border p-3"
      }
    }
  });

  async function saveCorrection() {
    if (!editor) return;
    const after = editor.getText();
    const before = "טיוטה ראשונית...";

    const response = await fetch("/api/corrections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draftId, before, after })
    });

    const data = await response.json();
    setMessage(response.ok ? `נשמר תיקון ${data.correctionId}` : data.error ?? "שגיאה");
  }

  return (
    <div className="space-y-3">
      <EditorContent editor={editor} />
      <Button onClick={saveCorrection}>שמור תיקון</Button>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
