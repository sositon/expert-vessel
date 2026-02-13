import Link from 'next/link';

const steps = [
  {
    title: '1) פתיחת כלי חדש',
    description: 'מגדירים שם לכלי, מה הוא אמור להפיק בסוף, ואיזה שדות חובה להזין בתהליך העבודה.',
    href: '/vessels/new',
    action: 'להגדרת כלי',
  },
  {
    title: '2) אימון הכלי עם חומרים',
    description: 'מעלים מסמכי PDF רלוונטיים לכלי שנוצר כדי לאמן אותו על מבנה וניסוחים מהתחום שלכם.',
    href: '/archives/upload',
    action: 'להעלאת חומרים',
  },
  {
    title: '3) הפקת תוצר סופי',
    description: 'מזינים פרטי מקרה וטופס נתונים, ומפיקים טיוטה סופית לעריכה ושמירה.',
    href: '/drafts/new',
    action: 'להפקת טיוטה',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">תוכנית עבודה מלאה לכלי</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          כדי לעבוד בצורה נקייה ופשוטה: קודם מגדירים Vessel חדש, אחר כך מעלים מקורות לאימון, ולבסוף מפיקים
          תוצר סופי. כל השלבים כאן בעברית ובזרימה אחת ברורה.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.href} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{step.description}</p>
            <Link
              href={step.href}
              className="mt-4 inline-flex w-fit items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {step.action}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
