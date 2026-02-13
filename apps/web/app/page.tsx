import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="container mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">לוח מחוונים</h1>
      <Card>
        <CardHeader>
          <CardTitle>סטטוס מערכת</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>זהו מסך placeholder ראשוני לניהול ארכיון, כלי שיט וטיוטות.</p>
          <ul className="list-disc pr-6 space-y-1">
            <li><Link className="text-primary underline" href="/archives/upload">העלאת ארכיון</Link></li>
            <li><Link className="text-primary underline" href="/vessels/new">יצירת כלי שיט</Link></li>
            <li><Link className="text-primary underline" href="/drafts/new">יצירת טיוטה</Link></li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
