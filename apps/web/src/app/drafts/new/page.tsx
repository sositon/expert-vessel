'use client';

import { useState } from 'react';

export default function NewDraftPage() {
  const [responseText, setResponseText] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      docType: String(formData.get('docType') ?? ''),
      sectionPath: String(formData.get('sectionPath') ?? ''),
      notes: String(formData.get('notes') ?? ''),
      formInputs: JSON.parse(String(formData.get('formInputs') ?? '{}')),
    };

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setResponseText(JSON.stringify(data, null, 2));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">יצירת טיוטה חדשה</h1>
      <form onSubmit={onSubmit} className="space-y-3 rounded border bg-white p-4">
        <input required name="docType" placeholder="doc_type" className="w-full rounded border p-2" />
        <input required name="sectionPath" placeholder="פרטי מקרה" className="w-full rounded border p-2" />
        <textarea required name="notes" className="h-32 w-full rounded border p-2" placeholder="הערות חופשיות" />
        <textarea name="formInputs" className="h-32 w-full rounded border p-2" defaultValue='{"שם":"ישראל ישראלי"}' />
        <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">הפקת טיוטה</button>
      </form>
      {responseText ? <pre className="rounded bg-slate-100 p-3 text-sm">{responseText}</pre> : null}
    </div>
  );
}
