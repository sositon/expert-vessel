"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewDraftPage() {
  const [result, setResult] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const notes = String(formData.get("notes") ?? "");
    const formInput = String(formData.get("form_input") ?? "");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes, formInput })
    });

    const data = await response.json();
    setResult(response.ok ? data.draft : data.error ?? "שגיאה");
  }

  return (
    <main className="container mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">יצירת טיוטה חדשה</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">הערות</Label>
          <Textarea id="notes" name="notes" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="form_input">נתוני טופס</Label>
          <Textarea id="form_input" name="form_input" required />
        </div>
        <Button type="submit">צור טיוטה</Button>
      </form>
      {result ? <pre className="rounded border p-3 text-xs whitespace-pre-wrap">{result}</pre> : null}
    </main>
  );
}
