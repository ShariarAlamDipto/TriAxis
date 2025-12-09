import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import BookletList from '../components/BookletList';

export default async function IALBookletsPage() {
  const supabase = await createClient();

  // Fetch IAL / A-Level booklets
  const { data: booklets } = await supabase
    .from('booklets')
    .select(`
      *,
      exam_type:exam_types!inner(name)
    `)
    .in('exam_type.name', ['A-Level', 'IAL'])
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-xs text-theme-muted font-mono">
          <Link href="/" className="hover:text-theme-primary transition-colors">HOME</Link>
          <span className="mx-2">/</span>
          <Link href="/booklets" className="hover:text-theme-primary transition-colors">BUY BOOKLETS</Link>
          <span className="mx-2">/</span>
          <span className="text-theme-primary">EDEXCEL IAL</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 uppercase tracking-wide font-mono">
            Edexcel IAL Booklets
          </h1>
          <p className="text-theme-muted font-mono text-sm">
            Complete unit booklets with past papers and mark schemes
          </p>
        </div>

        <BookletList booklets={booklets || []} />
      </main>
    </div>
  );
}

