import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

interface SubjectsPageProps {
  params: {
    level: string;
  };
}

const mockSubjects = [
  { id: '1', name: 'Mathematics', code: '4MA1', level: 'igcse' },
  { id: '2', name: 'Physics', code: '4PH1', level: 'igcse' },
  { id: '3', name: 'Chemistry', code: '4CH1', level: 'igcse' },
  { id: '4', name: 'Biology', code: '4BI1', level: 'igcse' },
  { id: '5', name: 'English Language', code: '4EA1', level: 'igcse' },
  { id: '6', name: 'Economics', code: '4EC0', level: 'igcse' },
  { id: '7', name: 'Computer Science', code: '4CS1', level: 'igcse' },
  { id: '8', name: 'Accounting', code: '4AC1', level: 'igcse' },
  { id: '9', name: 'Business Studies', code: '4BS1', level: 'igcse' },
];

const mockIALSubjects = [
  { id: '10', name: 'Mathematics', code: 'WMA11', level: 'ial' },
  { id: '11', name: 'Physics', code: 'WPH11', level: 'ial' },
  { id: '12', name: 'Chemistry', code: 'WCH11', level: 'ial' },
  { id: '13', name: 'Biology', code: 'WBI11', level: 'ial' },
  { id: '14', name: 'Economics', code: 'WEC11', level: 'ial' },
];

export default async function SubjectsPage({ params }: SubjectsPageProps) {
  const { level } = params;
  const isIGCSE = level === 'igcse';
  const levelName = isIGCSE ? 'EDEXCEL IGCSE' : 'EDEXCEL IAL';
  const levelDesc = isIGCSE ? "O-Level" : "International Advanced Level";

  const supabase = await createClient();
  
  // Fetch subjects from database
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('name');

  // Use mock data if database is empty
  const displaySubjects = (subjects && subjects.length > 0) 
    ? subjects 
    : (isIGCSE ? mockSubjects : mockIALSubjects);

  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-xs text-theme-muted font-mono">
          <Link href="/" className="hover:text-theme-primary transition-colors">HOME</Link>
          <span className="mx-2">/</span>
          <span className="text-theme-primary">{levelName} SUBJECTS</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl mb-4 uppercase tracking-wide font-mono">
            {levelName}
          </h1>
          <p className="text-theme-muted font-mono text-sm">
            {levelDesc} — Select a subject to view available past papers
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displaySubjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/papers/${level}/${encodeURIComponent(subject.name)}`}
              className="border border-theme p-8 hover:border-brand-orange transition-all group relative"
            >
              <div className="absolute top-0 left-0 h-1 w-0 bg-brand-orange transition-all group-hover:w-full"></div>
              <div className="text-xs text-brand-teal mb-3 font-mono tracking-[0.15em]">
                {(subject as any).code || 'SUBJECT'}
              </div>
              <h3 className="text-2xl uppercase tracking-wide font-mono group-hover:text-theme-primary transition-colors">
                {subject.name}
              </h3>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
