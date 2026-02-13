"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArchiveUploadPage() {
  const [message, setMessage] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("pdf") as File | null;
    const docType = String(formData.get("doc_type") ?? "");

    if (!file || !docType) {
      setMessage("יש למלא סוג מסמך ולבחור קובץ PDF.");
      return;
    }

    const upload = new FormData();
    upload.append("pdf", file);
    upload.append("doc_type", docType);

    const response = await fetch("/api/ingest", { method: "POST", body: upload });
    const data = await response.json();
    setMessage(response.ok ? `נשמר: ${data.documentId}` : data.error ?? "שגיאה");
  }

  return (
    <main className="container mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">העלאת ארכיון</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="doc_type">סוג מסמך</Label>
          <Input id="doc_type" name="doc_type" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pdf">PDF</Label>
          <Input id="pdf" name="pdf" type="file" accept="application/pdf" required />
        </div>
        <Button type="submit">העלה</Button>
      </form>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </main>
  );
}
