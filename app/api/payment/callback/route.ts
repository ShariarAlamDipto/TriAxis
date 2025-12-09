import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { bkashService } from '@/lib/bkash/service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const paymentID = searchParams.get('paymentID');
    const status = searchParams.get('status');
    const purchaseId = searchParams.get('purchaseId');

    if (!paymentID || !purchaseId) {
      return NextResponse.redirect(
        new URL('/payment/failed?error=missing_params', request.url)
      );
    }

    const supabase = await createClient();

    // Check if payment was cancelled
    if (status === 'cancel' || status === 'failure') {
      await supabase
        .from('purchases')
        .update({ payment_status: 'failed' })
        .eq('id', purchaseId);

      return NextResponse.redirect(
        new URL('/payment/failed?error=cancelled', request.url)
      );
    }

    // Execute payment
    const executeResponse = await bkashService.executePayment(paymentID);

    if (executeResponse.transactionStatus === 'Completed') {
      // Update purchase record
      await supabase
        .from('purchases')
        .update({
          payment_status: 'completed',
          transaction_id: executeResponse.trxID,
        })
        .eq('id', purchaseId);

      return NextResponse.redirect(
        new URL(`/payment/success?purchaseId=${purchaseId}`, request.url)
      );
    } else {
      await supabase
        .from('purchases')
        .update({ payment_status: 'failed' })
        .eq('id', purchaseId);

      return NextResponse.redirect(
        new URL('/payment/failed?error=payment_failed', request.url)
      );
    }
  } catch (error: any) {
    console.error('Payment callback error:', error);
    return NextResponse.redirect(
      new URL('/payment/failed?error=server_error', request.url)
    );
  }
}
