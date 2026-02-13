import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">לוח בקרה - Anti-Gravity Expertise Wrapper</h1>
      <ul className="list-disc space-y-2 pr-6">
        <li><Link className="text-blue-700 underline" href="/archives/upload">העלאת ארכיון</Link></li>
        <li><Link className="text-blue-700 underline" href="/vessels/new">יצירת כלי חדש</Link></li>
        <li><Link className="text-blue-700 underline" href="/drafts/new">יצירת טיוטה חדשה</Link></li>
      </ul>
    </div>
  );
}
