'use client';

import { useState } from 'react';

export default function UploadArchivePage() {
  const [status, setStatus] = useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/ingest', {
      method: 'POST',
      body: formData,
    });

    const payload = await response.json();
    setStatus(JSON.stringify(payload, null, 2));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">העלאת מסמך PDF</h1>
      <form onSubmit={onSubmit} className="space-y-3 rounded border bg-white p-4">
        <input required name="docType" placeholder="doc_type" className="w-full rounded border p-2" />
        <input required type="file" accept="application/pdf" name="file" className="w-full rounded border p-2" />
        <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">הפעלת קליטה</button>
      </form>
      {status ? <pre className="rounded bg-slate-100 p-3 text-sm">{status}</pre> : null}
    </div>
  );
}
