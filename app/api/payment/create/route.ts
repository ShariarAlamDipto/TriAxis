import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { bkashService } from '@/lib/bkash/service';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { paperId } = await request.json();

    // Get paper details
    const { data: paper, error: paperError } = await supabase
      .from('papers')
      .select('*')
      .eq('id', paperId)
      .single();

    if (paperError || !paper) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    if (!paper.is_premium) {
      return NextResponse.json({ error: 'Paper is not premium' }, { status: 400 });
    }

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        paper_id: paperId,
        amount: paper.price,
        payment_method: 'bkash',
        payment_status: 'pending',
      })
      .select()
      .single();

    if (purchaseError) {
      return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 });
    }

    // Create bKash payment
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const callbackURL = `${siteUrl}/api/payment/callback?purchaseId=${purchase.id}`;

    const paymentResponse = await bkashService.createPayment(
      paper.price,
      purchase.id,
      callbackURL
    );

    return NextResponse.json({
      paymentID: paymentResponse.paymentID,
      bkashURL: paymentResponse.bkashURL,
      purchaseId: purchase.id,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  }
}
