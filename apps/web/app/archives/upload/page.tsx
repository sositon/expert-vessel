"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArchivesUploadPage() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/ingest", { method: "POST", body: formData });
    const payload = (await response.json()) as { error?: string; documentId?: string };
    setMessage(response.ok ? `נוצר מסמך: ${payload.documentId}` : payload.error ?? "שגיאה");
  }

  return (
    <main className="container mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">העלאת ארכיון</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="doc_type">סוג מסמך</Label>
          <Input id="doc_type" name="doc_type" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pdf">קובץ PDF</Label>
          <Input id="pdf" name="pdf" type="file" accept="application/pdf" required />
        </div>
        <Button type="submit">העלה</Button>
      </form>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </main>
  );
}
