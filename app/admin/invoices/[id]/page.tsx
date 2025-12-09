import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Printer, ArrowLeft } from 'lucide-react';
import PrintButton from './PrintButton';
import { Database } from '@/types/supabase';

type PurchaseWithDetails = Database['public']['Tables']['purchases']['Row'] & {
  paper: Database['public']['Tables']['papers']['Row'] | null;
  booklet: Database['public']['Tables']['booklets']['Row'] | null;
  user: Database['public']['Tables']['user_profiles']['Row'] | null;
};

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // First get the transaction_id from the requested purchase
  const { data: initialPurchase } = await supabase
    .from('purchases')
    .select('transaction_id')
    .eq('id', params.id)
    .single();

  if (!initialPurchase) {
    notFound();
  }

  // Then fetch all items in that transaction
  const { data: orders, error } = await supabase
    .from('purchases')
    .select(`
      *,
      paper:papers(*),
      booklet:booklets(*),
      user:user_profiles(*)
    `)
    .eq('transaction_id', initialPurchase.transaction_id)
    .returns<PurchaseWithDetails[]>();

  if (error) {
    console.error('Error fetching invoice:', error);
    return <div>Error loading invoice: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
    notFound();
  }

  const mainOrder = orders[0];
  const user = mainOrder.user;
  
  // Calculate totals
  const subtotal = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
  const deliveryCharge = orders.reduce((sum, order) => sum + (order.delivery_charge || 0), 0);
  const total = subtotal + deliveryCharge;

  return (
    <div className="max-w-3xl mx-auto bg-white text-black p-12 shadow-lg my-8 font-mono">
      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-12 border-b border-black pb-8">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">INVOICE</h1>
          <p className="text-sm">#{mainOrder.transaction_id?.slice(0, 8)}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold uppercase tracking-[0.2em]">TRI AXIS</h2>
          <p className="text-sm mt-1">Digital Archive</p>
          <p className="text-sm">support@triaxis.com</p>
        </div>
      </div>

      {/* Bill To / Date */}
      <div className="flex justify-between mb-12">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Bill To:</h3>
          <p className="font-bold">{user?.full_name || 'Guest'}</p>
          <p>{user?.phone}</p>
          {mainOrder.address && (
            <div className="mt-2 text-sm max-w-xs">
              <p className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-1">Delivery Address:</p>
              <p className="whitespace-pre-wrap">{mainOrder.address}</p>
            </div>
          )}
        </div>
        <div className="text-right">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Date:</h3>
          <p>{new Date(mainOrder.created_at).toLocaleDateString()}</p>
          <p>{new Date(mainOrder.created_at).toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Items */}
      <table className="w-full mb-12">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="text-left py-3 uppercase tracking-wider text-xs">Description</th>
            <th className="text-right py-3 uppercase tracking-wider text-xs">Type</th>
            <th className="text-right py-3 uppercase tracking-wider text-xs">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const itemTitle = order.paper?.title || order.booklet?.title || 'Unknown Item';
            const itemType = order.booklet_id ? 'Physical Booklet' : 'Digital Paper';
            
            return (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="py-4">
                  <p className="font-bold">{itemTitle}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.id}</p>
                </td>
                <td className="text-right py-4 text-sm">{itemType}</td>
                <td className="text-right py-4">৳{order.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end mb-12">
        <div className="w-1/2">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Subtotal</span>
            <span>৳{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Delivery Charge</span>
            <span>৳{deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b-2 border-black font-bold text-xl mt-2">
            <span>Total</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mb-12 p-4 border border-gray-200 bg-gray-50 text-center italic">
        "Good Luck for the exam season"
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-12 pt-8 border-t border-gray-200">
        <p>Thank you for your purchase.</p>
        <p className="mt-1">This is a computer generated invoice.</p>
      </div>

      {/* Actions (Hidden when printing) */}
      <div className="fixed bottom-8 right-8 print:hidden flex gap-4">
        <Link 
          href="/admin/orders"
          className="bg-black text-white px-6 py-3 uppercase tracking-wider text-xs hover:bg-gray-800 transition-colors flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <PrintButton />
      </div>
    </div>
  );
}
