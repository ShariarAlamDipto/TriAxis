import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import { Database } from '@/types/supabase';

type PurchaseWithDetails = Database['public']['Tables']['purchases']['Row'] & {
  paper: { title: string } | null;
  booklet: { title: string } | null;
  user: { full_name: string | null; phone: string | null } | null;
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from('purchases')
    .select(`
      *,
      paper:papers(title),
      booklet:booklets(title),
      user:user_profiles(full_name, phone)
    `)
    .order('created_at', { ascending: false })
    .returns<PurchaseWithDetails[]>();

  if (error) {
    console.error('Error fetching orders:', error);
    return (
      <div className="p-6 text-red-500">
        Error loading orders: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-theme-primary uppercase tracking-wide">Orders & Invoices</h1>
      </div>

      <div className="bg-panel border border-theme overflow-hidden">
        <table className="min-w-full divide-y divide-theme">
          <thead className="bg-theme">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Paper
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody className="bg-panel divide-y divide-theme">
            {orders?.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-theme-muted font-mono">
                  {order.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-theme-primary font-mono">
                    {order.user?.full_name || 'Unknown'}
                  </div>
                  <div className="text-xs text-theme-muted font-mono">
                    {order.user?.phone || 'No Phone'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {order.paper?.title || order.booklet?.title || 'Unknown Item'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gold font-mono">
                  ৳{order.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold border font-mono uppercase ${
                    order.payment_status === 'completed' 
                      ? 'border-brand-teal text-brand-teal' 
                      : 'border-red-500 text-red-500'
                  }`}>
                    {order.payment_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/invoices/${order.id}`}
                    className="text-brand-orange hover:text-white border border-brand-orange hover:bg-brand-orange px-3 py-1 text-xs uppercase tracking-wider transition-all inline-flex items-center"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!orders || orders.length === 0) && (
          <div className="text-center py-12">
            <p className="text-theme-muted font-mono">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
