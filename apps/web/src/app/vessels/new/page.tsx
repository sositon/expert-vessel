'use client';

import { useState } from 'react';

export default function NewVesselPage() {
  const [result, setResult] = useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      vesselName: data.get('vesselName'),
      docType: data.get('docType'),
      outputGoal: data.get('outputGoal'),
      schema: data.get('schema'),
    };

    setResult(JSON.stringify(body, null, 2));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">שלב 1: יצירת Vessel חדש</h1>
        <p className="mt-2 text-sm text-slate-600">תנו שם לכלי, הגדירו את סוג המסמך ואת מבנה הפלט הסופי.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">שם הכלי</span>
          <input required name="vesselName" placeholder="לדוגמה: כלי לתיק רפואי" className="w-full rounded-lg border border-slate-300 p-2.5" />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">סוג מסמך (docType)</span>
          <input required name="docType" placeholder="medical_legal" className="w-full rounded-lg border border-slate-300 p-2.5" />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">מה התוצר הסופי שהכלי צריך להפיק?</span>
          <textarea required name="outputGoal" className="h-24 w-full rounded-lg border border-slate-300 p-2.5" placeholder="לדוגמה: טיוטת סיכום מקצועית עם סעיפים קבועים" />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">סכמת שדות (JSON)</span>
          <textarea
            required
            name="schema"
            className="h-44 w-full rounded-lg border border-slate-300 p-2.5 font-mono text-xs"
            defaultValue='{"fields":[{"name":"שם","required":true},{"name":"מספר תיק","required":true}]}'
          />
        </label>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700" type="submit">שמירת הגדרות הכלי</button>
      </form>

      {result ? <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">{result}</pre> : null}
    </div>
  );
}
