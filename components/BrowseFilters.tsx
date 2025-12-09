'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ExamType, Subject } from '@/types/database';

interface BrowseFiltersProps {
  examTypes: ExamType[] | null;
  subjects: Subject[] | null;
  selectedType?: string;
  selectedSubject?: string;
}

export default function BrowseFilters({ 
  examTypes, 
  subjects, 
  selectedType, 
  selectedSubject 
}: BrowseFiltersProps) {
  const router = useRouter();

  const handleSubjectChange = (subjectId: string) => {
    const url = new URL(window.location.href);
    if (subjectId) {
      url.searchParams.set('subject', subjectId);
    } else {
      url.searchParams.delete('subject');
    }
    router.push(url.pathname + url.search);
  };

  return (
    <div className="bg-panel rounded-xl p-8 mb-8 border border-theme">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Exam Type Filter */}
        <div>
          <label className="block text-xs font-bold text-theme-muted mb-3 uppercase tracking-wider font-mono">
            Exam Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {examTypes?.map((examType) => (
              <Link
                key={examType.id}
                href={`/browse?type=${examType.name.toLowerCase().replace('-', '')}`}
                className={`px-4 py-3 text-center font-bold transition-all uppercase tracking-wider text-xs font-mono ${
                  selectedType === examType.name.toLowerCase().replace('-', '')
                    ? 'bg-brand-orange text-white border border-brand-orange'
                    : 'bg-theme text-theme-primary hover:border-brand-teal border border-theme'
                }`}
              >
                {examType.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Subject Filter */}
        <div>
          <label htmlFor="subject-filter" className="block text-xs font-bold text-theme-muted mb-3 uppercase tracking-wider font-mono">
            Subject
          </label>
          <select
            id="subject-filter"
            value={selectedSubject || ''}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full px-4 py-3 bg-theme border border-theme text-theme-primary focus:border-brand-teal focus:outline-none transition-colors font-mono text-sm"
          >
            <option value="">All Subjects</option>
            {subjects?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedType || selectedSubject) && (
        <div className="mt-6">
          <Link
            href="/browse"
            className="text-xs text-brand-orange hover:text-theme-primary hover:underline font-bold uppercase tracking-wider font-mono"
          >
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  );
}
