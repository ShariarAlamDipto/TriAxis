'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  expanded: boolean;
}

interface Paper {
  id: string;
  title: string;
  year: number;
  variant: string;
  price: number;
  coverImage?: string;
  description?: string;
}

const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', code: '9709', expanded: false },
  { id: '2', name: 'Physics', code: '9702', expanded: false },
  { id: '3', name: 'Chemistry', code: '9701', expanded: false },
  { id: '4', name: 'Biology', code: '9700', expanded: false },
  { id: '5', name: 'English Language', code: '1123', expanded: false },
  { id: '6', name: 'Economics', code: '9708', expanded: false },
  { id: '7', name: 'Computer Science', code: '9618', expanded: false },
  { id: '8', name: 'Accounting', code: '9706', expanded: false },
];

const mockPapers: Record<string, Paper[]> = {
  '1': [
    { id: '1-1', title: 'Pure Mathematics 1', year: 2024, variant: 'Paper 1', price: 80 },
    { id: '1-2', title: 'Pure Mathematics 2', year: 2024, variant: 'Paper 2', price: 80 },
    { id: '1-3', title: 'Mechanics', year: 2024, variant: 'Paper 4', price: 80 },
  ],
  '2': [
    { id: '2-1', title: 'AS Level Physics', year: 2024, variant: 'Paper 1', price: 80 },
    { id: '2-2', title: 'A2 Level Physics', year: 2024, variant: 'Paper 4', price: 80 },
  ],
};

export default function ArchiveBrowsePage() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const toggleSubject = (subjectId: string) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, expanded: !s.expanded } : s
    ));
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
      setSelectedPaper(null);
    }
  };

  const selectPaper = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  return (
    <div className="min-h-screen bg-pure-black text-off-white">
      {/* Minimal Header */}
      <header className="border-b border-accent-subtle">
        <div className="max-w-full px-6 py-6 flex justify-between items-center">
          <Link href="/" className="text-sm tracking-archive uppercase hover:text-highlight transition-colors">
            TRI AXIS
          </Link>
          <Link href="/cart" className="hover:text-highlight transition-colors">
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* Three-Column Layout */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left Panel - Subject List */}
        <aside className="w-80 border-r border-accent-subtle overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xs tracking-archive mb-6 text-muted-grey">
              SUBJECTS
            </h2>
            <div className="space-y-1">
              {subjects.map((subject) => (
                <div key={subject.id}>
                  <button
                    onClick={() => toggleSubject(subject.id)}
                    className="w-full text-left py-2 px-3 text-sm hover:bg-dark-grey transition-colors flex items-center justify-between group"
                  >
                    <span className="group-hover:text-highlight transition-colors">
                      {subject.code} {subject.name.toUpperCase()}
                    </span>
                    {subject.expanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </button>
                  
                  {/* Sub-items (Years/Variants) */}
                  {subject.expanded && mockPapers[subject.id] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {mockPapers[subject.id].map((paper) => (
                        <button
                          key={paper.id}
                          onClick={() => selectPaper(paper)}
                          className={`w-full text-left py-2 px-3 text-xs hover:bg-dark-grey transition-colors ${
                            selectedPaper?.id === paper.id ? 'bg-dark-grey text-highlight' : 'text-muted-grey'
                          }`}
                        >
                          {paper.year} — {paper.variant}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center - Paper Details */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-12">
            {selectedSubject && (
              <>
                <div className="mb-8">
                  <div className="text-xs tracking-archive text-muted-grey mb-2">
                    SUBJECT
                  </div>
                  <h1 className="text-2xl mb-2">{selectedSubject.name.toUpperCase()}</h1>
                  <div className="text-sm text-muted-grey">
                    Code: {selectedSubject.code}
                  </div>
                </div>

                {selectedPaper && (
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <div className="text-xs tracking-archive text-muted-grey mb-2">
                        PAPER
                      </div>
                      <h2 className="text-xl mb-2">{selectedPaper.title}</h2>
                      <div className="text-sm text-muted-grey space-y-1">
                        <div>Year: {selectedPaper.year}</div>
                        <div>Variant: {selectedPaper.variant}</div>
                        <div>Price: ৳{selectedPaper.price}</div>
                      </div>
                    </div>

                    {selectedPaper.description && (
                      <div>
                        <div className="text-xs tracking-archive text-muted-grey mb-2">
                          DESCRIPTION
                        </div>
                        <p className="text-sm leading-relaxed text-muted-grey">
                          {selectedPaper.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {!selectedSubject && (
              <div className="text-center py-20">
                <p className="text-sm text-muted-grey">
                  Select a subject from the left panel to begin
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Right Panel - Preview & Action */}
        <aside className="w-96 border-l border-accent-subtle overflow-y-auto">
          <div className="p-12">
            {selectedPaper ? (
              <>
                {/* Preview Image */}
                <div className="aspect-[3/4] bg-dark-grey mb-6 flex items-center justify-center">
                  {selectedPaper.coverImage ? (
                    <Image
                      src={selectedPaper.coverImage}
                      alt={selectedPaper.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-accent-subtle text-xs tracking-archive">
                      NO PREVIEW
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full btn-primary py-3 mb-4">
                  Add to Cart
                </button>

                <Link 
                  href={`/papers/${selectedPaper.id}`}
                  className="block text-center text-xs text-muted-grey hover:text-off-white transition-colors"
                >
                  View Details →
                </Link>
              </>
            ) : (
              <div className="aspect-[3/4] bg-dark-grey flex items-center justify-center">
                <div className="text-accent-subtle text-xs tracking-archive">
                  SELECT A PAPER
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
