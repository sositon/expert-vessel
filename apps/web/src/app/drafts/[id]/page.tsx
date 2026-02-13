'use client';

import { useState } from 'react';

import { RichEditor } from '@/components/rich-editor';

export default function DraftEditorPage({ params }: { params: { id: string } }) {
  const [html, setHtml] = useState('<p>עריכת טיוטה</p>');
  const [status, setStatus] = useState('');

  const saveCorrection = async () => {
    const response = await fetch('/api/corrections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftId: params.id, before: '<p>עריכת טיוטה</p>', after: html }),
    });

    const payload = await response.json();
    setStatus(JSON.stringify(payload, null, 2));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">עורך טיוטה {params.id}</h1>
      <RichEditor value={html} onChange={setHtml} />
      <button onClick={saveCorrection} className="rounded bg-green-600 px-4 py-2 text-white" type="button">
        שמירת תיקון
      </button>
      {status ? <pre className="rounded bg-slate-100 p-3 text-sm">{status}</pre> : null}
    </div>
  );
}
