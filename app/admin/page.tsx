import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function AdminPapersPage() {
  const supabase = await createClient();

  const { data: papers } = await supabase
    .from('papers')
    .select(`
      *,
      subject:subjects(name),
      exam_type:exam_types(name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-theme-primary uppercase tracking-wide">Manage Papers</h1>
        <Link href="/admin/papers/new" className="border border-brand-orange text-brand-orange px-4 py-2 uppercase tracking-[0.2em] text-xs hover:bg-brand-orange hover:text-white transition-all flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Paper
        </Link>
      </div>

      {/* Papers Table */}
      <div className="bg-panel border border-theme overflow-hidden">
        <table className="min-w-full divide-y divide-theme">
          <thead className="bg-theme">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Exam Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-panel divide-y divide-theme">
            {papers?.map((paper) => (
              <tr key={paper.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-theme-primary font-mono">{paper.title}</div>
                  {paper.paper_number && (
                    <div className="text-xs text-theme-muted font-mono">{paper.paper_number}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {(paper.subject as any)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {(paper.exam_type as any)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {paper.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {paper.is_premium ? (
                    <span className="px-2 py-1 text-xs font-semibold border border-brand-gold text-brand-gold font-mono uppercase">
                      Premium (৳{paper.price})
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold border border-brand-teal text-brand-teal font-mono uppercase">
                      Free
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/papers/${paper.id}/edit`}
                    className="text-brand-teal hover:text-brand-orange mr-4 transition-colors"
                  >
                    <Edit className="h-4 w-4 inline" />
                  </Link>
                  <button className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 className="h-4 w-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!papers || papers.length === 0) && (
          <div className="text-center py-12">
            <p className="text-theme-muted font-mono">No papers yet. Add your first paper!</p>
          </div>
        )}
      </div>
    </div>
  );
}
