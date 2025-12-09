import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import BookletList from '../components/BookletList';

export default async function IGCSEBookletsPage() {
  const supabase = await createClient();

  // Fetch O-Level / IGCSE booklets
  // We'll search for 'O-Level' or 'IGCSE' in exam_types
  const { data: booklets } = await supabase
    .from('booklets')
    .select(`
      *,
      exam_type:exam_types!inner(name)
    `)
    .in('exam_type.name', ['O-Level', 'IGCSE'])
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
          <span className="text-theme-primary">EDEXCEL IGCSE</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 uppercase tracking-wide font-mono">
            Edexcel IGCSE Booklets
          </h1>
          <p className="text-theme-muted font-mono text-sm">
            Complete subject booklets with past papers and mark schemes
          </p>
        </div>

        <BookletList booklets={booklets || []} />
      </main>
    </div>
  );
}

