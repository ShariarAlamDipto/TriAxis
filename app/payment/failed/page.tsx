import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentFailedPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMessages: { [key: string]: string } = {
    cancelled: 'You cancelled the payment process.',
    payment_failed: 'The payment could not be completed.',
    server_error: 'A server error occurred. Please try again.',
    missing_params: 'Invalid payment request.',
  };

  const errorMessage = errorMessages[searchParams.error || ''] || 'Payment failed.';

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center px-4 font-mono">
      <div className="max-w-md w-full bg-panel border border-theme p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
          <XCircle className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-theme-primary mb-2 uppercase tracking-wide">
          Payment Failed
        </h1>

        <p className="text-theme-muted mb-6 text-sm">
          {errorMessage}
        </p>

        <div className="space-y-3">
          <Link href="/subjects/o-level" className="w-full block py-3 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all uppercase tracking-[0.2em] text-sm">
            Try Again
          </Link>
          <Link href="/dashboard" className="w-full block py-3 border border-theme text-theme-muted hover:text-theme-primary hover:border-theme-primary transition-all uppercase tracking-[0.2em] text-sm">
            Go to Dashboard
          </Link>
        </div>

        <div className="mt-6 text-sm text-theme-muted">
          <p>Need help? <Link href="/contact" className="text-brand-teal hover:text-brand-orange transition-colors">Contact support</Link></p>
        </div>
      </div>
    </div>
  );
}
