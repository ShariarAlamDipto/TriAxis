import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function BookletsPage() {
  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-xs text-theme-muted font-mono">
          <Link href="/" className="hover:text-theme-primary transition-colors">HOME</Link>
          <span className="mx-2">/</span>
          <span className="text-theme-primary">BUY BOOKLETS</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl mb-4 uppercase tracking-wide font-mono">
            Buy Booklets
          </h1>
          <p className="text-theme-muted font-mono text-sm">
            Physical booklets containing past papers organized by subject and year
          </p>
        </div>

        {/* Booklet Categories */}
        <div className="space-y-8">
          <Link 
            href="/booklets/igcse"
            className="block border border-theme p-6 md:p-12 hover:border-brand-orange transition-all group relative"
          >
            <div className="absolute top-0 right-0 w-1 h-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl mb-4 uppercase tracking-wide font-mono group-hover:text-theme-primary transition-colors">
                  Edexcel IGCSE Booklets
                </h3>
                <p className="text-theme-muted font-mono text-sm mb-2">
                  Complete subject booklets with past papers and mark schemes
                </p>
                <div className="text-xs text-brand-teal font-mono">
                  O-Level • All Subjects • Multiple Years
                </div>
              </div>
              <div className="text-2xl font-mono text-brand-gold">
                
              </div>
            </div>
          </Link>

          <Link 
            href="/booklets/ial"
            className="block border border-theme p-6 md:p-12 hover:border-brand-orange transition-all group relative"
          >
            <div className="absolute top-0 right-0 w-1 h-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl mb-4 uppercase tracking-wide font-mono group-hover:text-theme-primary transition-colors">
                  Edexcel IAL Booklets
                </h3>
                <p className="text-theme-muted font-mono text-sm mb-2">
                  Complete unit booklets with past papers and mark schemes
                </p>
                <div className="text-xs text-brand-teal font-mono">
                  International Advanced Level • All Units • Multiple Years
                </div>
              </div>
              <div className="text-2xl font-mono text-brand-gold">
                
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 pt-16 border-t border-theme">
          <h2 className="text-xs tracking-[0.2em] mb-8 uppercase font-mono text-theme-muted">
            Booklet Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-sm font-mono">
            <div>
              <div className="mb-2 text-theme-primary">High Quality Print</div>
              <div className="text-theme-muted">Professional printing on premium paper</div>
            </div>
            <div>
              <div className="mb-2 text-theme-primary">Organized by Year</div>
              <div className="text-theme-muted">Papers sorted chronologically for easy reference</div>
            </div>
            <div>
              <div className="mb-2 text-theme-primary">Fast Delivery</div>
              <div className="text-theme-muted">Ships within 2-3 business days</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
