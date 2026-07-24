import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Tyson's Curated Gear & Essentials",
  description: 'The exact gear, collars, harnesses, and chews we actually use and test.',
};

const gearItems = [
  {
    name: 'Our Go-To Everyday Harness',
    description: "Sturdy, secure, and doesn't chafe during long walks along the coast.",
    category: 'Walking',
    // Replace with your actual tagged link
    affiliateUrl: 'https://www.amazon.com/dp/EXAMPLE?tag=tysonspicks-20',
    imagePlaceholder: '🐕‍🦺',
  },
  {
    name: 'Heavy-Duty Chew Toy',
    description: 'The only one that has survived months of serious testing.',
    category: 'Play',
    affiliateUrl: 'https://www.amazon.com/dp/EXAMPLE?tag=tysonspicks-20',
    imagePlaceholder: '🦴',
  },
  {
    name: 'Travel Water Bottle & Bowl',
    description: 'Essential for hot days out and quick hydration on the move.',
    category: 'Travel',
    affiliateUrl: 'https://www.amazon.com/dp/EXAMPLE?tag=tysonspicks-20',
    imagePlaceholder: '💧',
  },
];

export default function GearPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 py-12 text-center">
        <span className="text-4xl mb-3 block">🐾</span>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tyson's Curated Gear</h1>
        <p className="text-slate-600 text-lg">
          Every collar, harness, and chew we actually use and put to the test. No fluff.
        </p>
      </header>

      {/* Main Content / Product Grid */}
      <main className="max-w-3xl mx-auto px-6 pb-16">
        <div className="space-y-6">
          {gearItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {item.imagePlaceholder}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <h2 className="text-lg font-semibold mt-1">{item.name}</h2>
                  <p className="text-sm text-slate-600 mt-0.5">{item.description}</p>
                </div>
              </div>

              <a
                href={item.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl text-center transition flex-shrink-0"
              >
                View on Amazon →
              </a>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 underline">
            ← Back home
          </Link>
        </div>

        {/* FTC Compliance Disclosure (Required by Amazon) */}
        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
          <p>As an Amazon Associate I earn from qualifying purchases.</p>
        </footer>
      </main>
    </div>
  );
}
