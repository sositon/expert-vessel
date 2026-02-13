import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/', label: 'תוכנית עבודה' },
  { href: '/vessels/new', label: 'יצירת כלי' },
  { href: '/archives/upload', label: 'העלאת מקורות' },
  { href: '/drafts/new', label: 'הפקת תוצר' },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <main className="mx-auto max-w-5xl p-6 md:p-10">
          <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-blue-700">פלטפורמת אימון כלי כתיבה</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">ניהול Vessel בצורה ברורה ונקייה</h1>
              <nav className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
