'use client';

import { useState } from 'react';

import { RichEditor } from '@/components/rich-editor';

export default function DraftEditorPage({ params }: { params: { id: string } }) {
  const [html, setHtml] = useState('<p>כאן עורכים את הטיוטה לפני סיום.</p>');
  const [status, setStatus] = useState('');

  const saveCorrection = async () => {
    const response = await fetch('/api/corrections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftId: params.id, before: '<p>כאן עורכים את הטיוטה לפני סיום.</p>', after: html }),
    });

    const payload = await response.json();
    setStatus(JSON.stringify(payload, null, 2));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">עריכת טיוטה #{params.id}</h1>
        <p className="mt-2 text-sm text-slate-600">בצעו שינויים אחרונים בתוכן ולחצו שמירת תיקון כדי לתעד את הגרסה המעודכנת.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <RichEditor value={html} onChange={setHtml} />
      </div>

      <button onClick={saveCorrection} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700" type="button">
        שמירת תיקון
      </button>

      {status ? <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">{status}</pre> : null}
    </div>
  );
}
