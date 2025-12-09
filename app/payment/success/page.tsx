import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { purchaseId?: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. You can now download your purchased paper.
        </p>

        {searchParams.purchaseId && (
          <p className="text-sm text-gray-500 mb-6">
            Purchase ID: {searchParams.purchaseId}
          </p>
        )}

        <div className="space-y-3">
          <Link href="/dashboard" className="btn-primary w-full block py-3">
            Go to Dashboard
          </Link>
          <Link href="/browse" className="btn-secondary w-full block py-3">
            Browse More Papers
          </Link>
        </div>
      </div>
    </div>
  );
}
