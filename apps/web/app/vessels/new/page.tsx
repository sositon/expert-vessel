"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewVesselPage() {
  const [result, setResult] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const docType = String(formData.get("doc_type") ?? "");
    const schemaJson = String(formData.get("schema_json") ?? "{}");
    setResult(`נשמר כלי שיט (placeholder) עבור ${docType}, אורך schema: ${schemaJson.length}`);
  }

  return (
    <main className="container mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">יצירת כלי שיט</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="doc_type">doc_type</Label>
          <Input id="doc_type" name="doc_type" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="schema_json">Schema JSON</Label>
          <Textarea id="schema_json" name="schema_json" defaultValue='{"fields":[]}' className="min-h-40" required />
        </div>
        <Button type="submit">שמור</Button>
      </form>
      {result ? <p className="text-sm text-muted-foreground">{result}</p> : null}
    </main>
  );
}
