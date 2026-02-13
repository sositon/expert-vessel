'use client';

import { useState } from 'react';

export default function NewVesselPage() {
  const [result, setResult] = useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      docType: data.get('docType'),
      schema: data.get('schema'),
    };

    setResult(JSON.stringify(body, null, 2));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">יצירת Vessel חדש</h1>
      <form onSubmit={onSubmit} className="space-y-3 rounded border bg-white p-4">
        <input required name="docType" placeholder="medical_legal" className="w-full rounded border p-2" />
        <textarea
          required
          name="schema"
          className="h-40 w-full rounded border p-2"
          defaultValue='{"fields":[{"name":"שם","required":true}]}'
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">שמירה</button>
      </form>
      {result ? <pre className="rounded bg-slate-100 p-3 text-sm">{result}</pre> : null}
    </div>
  );
}
