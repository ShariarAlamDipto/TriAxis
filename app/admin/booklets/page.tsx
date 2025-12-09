import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function AdminBookletsPage() {
  const supabase = await createClient();

  const { data: booklets } = await supabase
    .from('booklets')
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
        <h1 className="text-2xl font-bold text-theme-primary uppercase tracking-wide">Manage Booklets</h1>
        <Link href="/admin/booklets/new" className="border border-brand-orange text-brand-orange px-4 py-2 uppercase tracking-[0.2em] text-xs hover:bg-brand-orange hover:text-white transition-all flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Booklet
        </Link>
      </div>

      {/* Booklets Table */}
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
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-panel divide-y divide-theme">
            {booklets?.map((booklet) => (
              <tr key={booklet.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-theme-primary font-mono">{booklet.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {(booklet.subject as any)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {(booklet.exam_type as any)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gold font-mono">
                  ৳{booklet.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/booklets/${booklet.id}/edit`}
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

        {(!booklets || booklets.length === 0) && (
          <div className="text-center py-12">
            <p className="text-theme-muted font-mono">No booklets found. Add your first booklet!</p>
          </div>
        )}
      </div>
    </div>
  );
}
