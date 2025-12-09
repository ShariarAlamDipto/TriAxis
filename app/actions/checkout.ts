'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface CheckoutItem {
  id: string;
  type: 'paper' | 'booklet';
  quantity: number;
}

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export async function placeOrder(items: CheckoutItem[], formData: CheckoutFormData) {
  const supabase = await createClient();

  // 1. Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  // 2. Update user profile
  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({
      phone: formData.phone,
      address: formData.address,
      full_name: formData.fullName
    })
    .eq('id', user.id);

  if (profileError) throw new Error('Failed to update profile');

  // 3. Calculate totals and prepare purchase records
  const transactionId = crypto.randomUUID();
  const purchases = [];
  let hasBooklet = false;

  for (const item of items) {
    let price = 0;
    
    if (item.type === 'paper') {
      const { data: paper } = await supabase
        .from('papers')
        .select('price, is_premium')
        .eq('id', item.id)
        .single();
        
      if (!paper) throw new Error(`Paper not found: ${item.id}`);
      // If it's not premium, price is 0, but let's respect the DB
      price = paper.price || 0;
    } else {
      const { data: booklet } = await supabase
        .from('booklets')
        .select('price')
        .eq('id', item.id)
        .single();
        
      if (!booklet) throw new Error(`Booklet not found: ${item.id}`);
      price = booklet.price;
      hasBooklet = true;
    }

    purchases.push({
      user_id: user.id,
      paper_id: item.type === 'paper' ? item.id : null,
      booklet_id: item.type === 'booklet' ? item.id : null,
      amount: price, // Store unit price or total? The schema has 'amount'. Usually unit price * quantity.
      // But wait, the schema doesn't have quantity!
      // The current system seems to assume quantity 1 per row, or 'amount' is total.
      // Let's check the schema.
      payment_method: 'cod',
      transaction_id: transactionId,
      payment_status: 'pending',
      address: formData.address,
      delivery_charge: 0 // Will set later
    });
    
    // If quantity > 1, we might need multiple rows OR the schema needs a quantity column.
    // The current checkout page maps items 1-to-1 to rows?
    // "const purchases = items.map(item => ({"
    // It doesn't seem to handle quantity > 1 by creating multiple rows, it just creates one row per item type.
    // But 'amount' is "Number(item.product.price)".
    // If quantity is 2, the price should be double?
    // The CartContext has quantity.
    // Let's assume for now we create one row per item type, but amount = price * quantity?
    // Or we should create N rows?
    // Creating N rows is safer for "digital" items if they are unique keys, but these are just access.
    // Let's stick to: 1 row per line item, amount = price * quantity.
    // But wait, the schema doesn't have 'quantity' column.
    // If I put total amount in 'amount', it's fine for accounting.
  }

  // Fix amounts based on quantity
  // Actually, the loop above iterates over 'items' which are CartItems.
  // So for each CartItem, we create one Purchase row.
  // We should multiply price by quantity.
  
  for (let i = 0; i < purchases.length; i++) {
    purchases[i].amount = purchases[i].amount * items[i].quantity;
  }

  // 4. Apply Delivery Charge
  const deliveryCharge = hasBooklet ? 100 : 0;
  if (purchases.length > 0) {
    purchases[0].delivery_charge = deliveryCharge;
  }

  // 5. Insert purchases
  const { error: purchaseError } = await supabase.from('purchases').insert(purchases);
  if (purchaseError) throw new Error('Failed to create order');

  revalidatePath('/admin/orders');
  return { success: true, transactionId };
}
