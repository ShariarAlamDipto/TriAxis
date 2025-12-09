import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { GraduationCap, Search, ShoppingCart } from 'lucide-react';
import { Paper } from '@/types/database';
import BrowseFilters from '@/components/BrowseFilters';
import PaperCard from '@/components/PaperCard';

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { type?: string; subject?: string };
}) {
  const supabase = await createClient();

  // Fetch exam types
  const { data: examTypes } = await supabase
    .from('exam_types')
    .select('*')
    .order('name');

  // Fetch subjects
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('name');

  // Build papers query
  let papersQuery = supabase
    .from('papers')
    .select(`
      *,
      subject:subjects(*),
      exam_type:exam_types(*)
    `)
    .order('year', { ascending: false });

  // Apply filters
  if (searchParams.type) {
    const examType = examTypes?.find(
      (et) => et.name.toLowerCase().replace('-', '') === searchParams.type
    );
    if (examType) {
      papersQuery = papersQuery.eq('exam_type_id', examType.id);
    }
  }

  if (searchParams.subject) {
    papersQuery = papersQuery.eq('subject_id', searchParams.subject);
  }

  const { data: papers } = await papersQuery;

  return (
    <div className="min-h-screen bg-theme font-mono">
      {/* Navigation */}
      <nav className="bg-panel border-b border-theme sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <GraduationCap className="h-8 w-8 text-brand-orange" />
              <span className="ml-2 text-xl font-extrabold text-theme-primary tracking-[0.2em] group-hover:text-brand-orange transition-colors">TRI AXIS</span>
            </Link>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/dashboard" className="text-theme-muted hover:text-brand-orange transition-colors uppercase tracking-wider">
                Dashboard
              </Link>
              <Link href="/cart" className="text-theme-muted hover:text-brand-orange transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </Link>
              <Link href="/login" className="border border-brand-orange text-brand-orange px-6 py-2 uppercase tracking-[0.2em] text-xs hover:bg-brand-orange hover:text-white transition-all">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-theme-primary mb-3 uppercase tracking-wide">Browse Past Papers</h1>
          <p className="text-xl text-theme-muted">
            Find papers by exam level and subject
          </p>
        </div>

        {/* Filters */}
        <BrowseFilters 
          examTypes={examTypes}
          subjects={subjects}
          selectedType={searchParams.type}
          selectedSubject={searchParams.subject}
        />

        {/* Papers Grid */}
        {papers && papers.length > 0 ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {papers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Search className="h-20 w-20 text-theme-muted mx-auto mb-6 opacity-50" />
            <h3 className="text-3xl font-extrabold text-theme-primary mb-3 uppercase tracking-wide">
              No papers found
            </h3>
            <p className="text-xl text-theme-muted">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
