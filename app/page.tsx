import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6">
        <div className="min-h-[80vh] flex flex-col justify-center max-w-3xl">
          <h1 className="text-xs tracking-[0.2em] mb-6 text-theme-muted uppercase font-mono">
            DIGITAL ARCHIVE
          </h1>
          <h2 className="text-4xl md:text-6xl leading-tight mb-8 font-mono uppercase tracking-wide text-theme-primary">
            Edexcel IGCSE & IAL Examination Papers
          </h2>
          <p className="text-lg text-theme-muted mb-12 leading-relaxed font-mono">
            Organized by subject, year, variant, and available for purchase.
          </p>
          <Link href="#categories" className="border border-theme text-theme-primary px-8 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-orange hover:border-brand-orange transition-all inline-block w-fit font-mono">
            Enter Archive
          </Link>
        </div>

        <div id="categories" className="py-12 md:py-24 space-y-8">
          <h2 className="text-xs tracking-[0.2em] mb-12 uppercase font-mono" style={{ color: 'var(--text-muted)' }}>
            SELECT CATEGORY
          </h2>

          <Link href="/subjects/igcse" className="block border p-6 md:p-12 hover:border-brand-orange transition-all group relative" style={{ borderColor: 'var(--border)' }}>
            <div className="absolute top-0 right-0 w-1 h-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-2xl md:text-3xl mb-4 uppercase tracking-wide font-mono group-hover:text-brand-orange transition-colors" style={{ color: 'var(--text-primary)' }}>
              Edexcel IGCSE (O-Level)
            </h3>
            <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              Past Papers • Mark Schemes • All Years
            </p>
          </Link>

          <Link href="/subjects/ial" className="block border p-6 md:p-12 hover:border-brand-orange transition-all group relative" style={{ borderColor: 'var(--border)' }}>
            <div className="absolute top-0 right-0 w-1 h-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-2xl md:text-3xl mb-4 uppercase tracking-wide font-mono group-hover:text-brand-orange transition-colors" style={{ color: 'var(--text-primary)' }}>
              Edexcel IAL (International Advanced Level)
            </h3>
            <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              Past Papers • Mark Schemes • All Units
            </p>
          </Link>
        </div>

        <footer className="py-24 border-t border-theme mt-32">
          <div className="grid md:grid-cols-3 gap-12 text-xs text-theme-muted font-mono">
            <div>
              <div className="mb-3 text-theme-primary tracking-[0.2em] uppercase">About</div>
              <p className="leading-relaxed">
                Digital archive of Edexcel IGCSE and IAL examination papers.
              </p>
            </div>
            <div>
              <div className="mb-3 text-theme-primary tracking-[0.2em] uppercase">Information</div>
              <div className="space-y-2">
                <Link href="/faq" className="block hover:text-brand-orange transition-colors">FAQ</Link>
                <Link href="/terms" className="block hover:text-brand-orange transition-colors">Terms</Link>
                <Link href="/privacy" className="block hover:text-brand-orange transition-colors">Privacy</Link>
              </div>
            </div>
            <div>
              <div className="mb-3 text-theme-primary tracking-[0.2em] uppercase">Contact</div>
              <div>support@triaxis.com</div>
            </div>
          </div>
          <div className="mt-12 text-xs text-theme-muted text-center font-mono">
            © 2025 TRI AXIS — All rights reserved
          </div>
        </footer>
      </main>
    </div>
  );
}
