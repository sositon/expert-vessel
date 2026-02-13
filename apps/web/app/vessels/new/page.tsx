"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewVesselPage() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const docType = String(formData.get("doc_type") ?? "");
    const schema = String(formData.get("schema") ?? "{}");

    setStatus(`כלי שיט נשמר (placeholder): ${docType} | schema length ${schema.length}`);
  }

  return (
    <main className="container mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">יצירת כלי שיט</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="doc_type">סוג מסמך</Label>
          <Input id="doc_type" name="doc_type" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="schema">Schema JSON</Label>
          <Textarea id="schema" name="schema" defaultValue='{"fields":[]}' required className="min-h-40" />
        </div>
        <Button type="submit">שמור כלי שיט</Button>
      </form>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </main>
  );
}
