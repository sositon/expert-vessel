import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">לוח מחוונים</h1>
      <Card>
        <CardHeader>
          <CardTitle>פעולות מהירות</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pr-6">
            <li><Link href="/archives/upload" className="text-primary underline">העלאת PDF לארכיון</Link></li>
            <li><Link href="/vessels/new" className="text-primary underline">יצירת כלי שיט חדש</Link></li>
            <li><Link href="/drafts/new" className="text-primary underline">יצירת טיוטה חדשה</Link></li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
