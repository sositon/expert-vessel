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
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">שלב 3: הפקת תוצר סופי</h1>
        <p className="mt-2 text-sm text-slate-600">מזינים נתוני מקרה, מוסיפים הערות, ומפיקים טיוטה ראשונית לעריכה.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">שם הכלי / docType</span>
          <input required name="docType" placeholder="medical_legal" className="w-full rounded-lg border border-slate-300 p-2.5" />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">סוג/נתיב הסעיף</span>
          <input required name="sectionPath" placeholder="סיכום ממצאים" className="w-full rounded-lg border border-slate-300 p-2.5" />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">הערות חופשיות למנוע</span>
          <textarea required name="notes" className="h-28 w-full rounded-lg border border-slate-300 p-2.5" placeholder="דגשים, סגנון ניסוח, אילוצים" />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">נתוני טופס (JSON)</span>
          <textarea name="formInputs" className="h-36 w-full rounded-lg border border-slate-300 p-2.5 font-mono text-xs" defaultValue='{"שם":"ישראל ישראלי","מספר תיק":"12345"}' />
        </label>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700" type="submit">הפקת טיוטה חדשה</button>
      </form>
      {responseText ? <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">{responseText}</pre> : null}
    </div>
  );
}
