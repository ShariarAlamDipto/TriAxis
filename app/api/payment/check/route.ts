import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const paperId = searchParams.get('paperId');

    if (!paperId) {
      return NextResponse.json({ error: 'Paper ID required' }, { status: 400 });
    }

    // Check if user has purchased this paper
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('paper_id', paperId)
      .eq('payment_status', 'completed')
      .single();

    return NextResponse.json({ hasPurchased: !!purchase });
  } catch (error: any) {
    console.error('Purchase check error:', error);
    return NextResponse.json(
      { error: 'Failed to check purchase status' },
      { status: 500 }
    );
  }
}
