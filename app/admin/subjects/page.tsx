import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Plus, Edit } from 'lucide-react';

export default async function AdminSubjectsPage() {
  const supabase = await createClient();

  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('name');

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-theme-primary">Manage Subjects</h1>
        <button className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Subject
        </button>
      </div>

      {/* Subjects Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {subjects?.map((subject) => (
          <div key={subject.id} className="bg-panel rounded-lg shadow-sm p-6 border border-theme">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-theme-primary mb-1">{subject.name}</h3>
                {subject.description && (
                  <p className="text-sm text-theme-secondary">{subject.description}</p>
                )}
              </div>
              <button className="text-primary hover:text-primary-dark">
                <Edit className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {(!subjects || subjects.length === 0) && (
        <div className="bg-panel rounded-lg shadow-sm p-12 text-center border border-theme">
          <p className="text-theme-muted">No subjects yet. Add your first subject!</p>
        </div>
      )}
    </div>
  );
}
