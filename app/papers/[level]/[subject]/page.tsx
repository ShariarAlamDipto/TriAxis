import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { FileText, Download } from 'lucide-react';

interface PapersPageProps {
  params: {
    level: string;
    subject: string;
  };
}

export default async function PapersPage({ params }: PapersPageProps) {
  const { level, subject } = params;
  const levelName = level.toUpperCase(); // IGCSE or IAL
  
  const supabase = await createClient();

  // 1. Get Exam Type ID
  const { data: examType } = await supabase
    .from('exam_types')
    .select('id')
    .ilike('name', levelName) // Case-insensitive match
    .single();

  // 2. Get Subject ID
  // Assuming the URL param is the subject name (e.g. "mathematics")
  const { data: subjectData } = await supabase
    .from('subjects')
    .select('*')
    .ilike('name', subject)
    .single();

  if (!examType || !subjectData) {
    return (
      <div className="min-h-screen bg-theme text-theme-primary">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-mono">Subject or Level not found</h1>
          <p className="mt-4 text-theme-muted">
            Could not find {levelName} papers for {subject}.
          </p>
          <Link href="/" className="mt-8 inline-block border border-theme px-6 py-3 hover:bg-theme hover:text-brand-orange transition-colors">
            Return Home
          </Link>
        </main>
      </div>
    );
  }

  // 3. Fetch Papers
  const { data: papers } = await supabase
    .from('papers')
    .select('*')
    .eq('exam_type_id', examType.id)
    .eq('subject_id', subjectData.id)
    .order('year', { ascending: false })
    .order('title', { ascending: true });

  // Group papers by year
  const papersByYear = (papers || []).reduce((acc: any, paper) => {
    const year = paper.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(paper);
    return acc;
  }, {});

  const years = Object.keys(papersByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-xs text-theme-muted font-mono">
          <Link href="/" className="hover:text-theme-primary transition-colors">HOME</Link>
          <span className="mx-2">/</span>
          <Link href={`/papers/${level}`} className="hover:text-theme-primary transition-colors uppercase">{levelName}</Link>
          <span className="mx-2">/</span>
          <span className="text-theme-primary uppercase">{subjectData.name}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 uppercase tracking-wide font-mono">
            {subjectData.name} <span className="text-brand-orange">{levelName}</span>
          </h1>
          <p className="text-theme-muted font-mono text-sm">
            Digital Archive - Past Papers & Mark Schemes
          </p>
        </div>

        {/* Years List */}
        <div className="space-y-12">
          {years.map((year) => (
            <div key={year} className="border-t border-theme pt-8">
              <h2 className="text-2xl font-mono mb-6 text-brand-teal">{year}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {papersByYear[year].map((paper: any) => (
                  <div key={paper.id} className="bg-panel border border-theme p-4 hover:border-brand-orange transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-theme rounded-lg group-hover:bg-brand-orange/10 transition-colors">
                        <FileText className="h-6 w-6 text-theme-muted group-hover:text-brand-orange transition-colors" />
                      </div>
                      {paper.file_url && (
                        <a 
                          href={paper.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-brand-teal hover:underline flex items-center"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </a>
                      )}
                    </div>
                    <h3 className="font-mono text-sm mb-2 group-hover:text-brand-orange transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-theme-muted font-mono">
                      {paper.paper_number || 'Paper'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {years.length === 0 && (
            <div className="text-center py-12 border border-theme border-dashed">
              <p className="text-theme-muted font-mono">No papers available for this subject yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
