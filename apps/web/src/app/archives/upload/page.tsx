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
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">שלב 2: העלאת מקורות לאימון</h1>
        <p className="mt-2 text-sm text-slate-600">העלו קובצי PDF שישמשו כבסיס לאימון הכלי. ככל שהחומרים מדויקים יותר, התוצרים יהיו טובים יותר.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">שם הכלי</span>
          <input required name="docType" placeholder="שם ה-Vessel או docType" className="w-full rounded-lg border border-slate-300 p-2.5" />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">סוג מקור</span>
          <select name="sourceType" className="w-full rounded-lg border border-slate-300 p-2.5">
            <option value="pdf">PDF מקצועי</option>
            <option value="example">דוגמת פלט קיים</option>
          </select>
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-medium text-slate-700">קובץ להעלאה</span>
          <input required type="file" accept="application/pdf" name="file" className="w-full rounded-lg border border-slate-300 p-2.5" />
        </label>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700" type="submit">התחלת אימון מהמסמך</button>
      </form>

      {status ? <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">{status}</pre> : null}
    </div>
  );
}
