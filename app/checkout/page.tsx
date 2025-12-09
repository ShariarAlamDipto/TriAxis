'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { placeOrder } from '@/app/actions/checkout';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?redirect=/checkout');
      } else {
        setUser(user);
        // Fetch profile
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setFormData(prev => ({
            ...prev,
            fullName: profile.full_name || '',
            email: user.email || '',
            phone: profile.phone || '',
            address: profile.address || '',
          }));
        }
      }
    };
    checkUser();
  }, []);

  const deliveryCharge = items.some(item => item.type === 'booklet') ? 100 : 0;
  const total = getTotalPrice() + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (!user) throw new Error('Please login to continue');

      const checkoutItems = items.map(item => ({
        id: item.product.id,
        type: item.type,
        quantity: item.quantity
      }));

      await placeOrder(checkoutItems, formData);

      setOrderPlaced(true);
      clearCart();
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-theme text-theme-primary">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="border border-theme p-12 bg-panel">
            <h1 className="text-4xl mb-6 uppercase tracking-wide font-mono">
              Thank You
            </h1>
            <p className="text-theme-muted mb-8 font-mono">
              Your order has been placed successfully.
            </p>
            <p className="text-sm text-theme-muted mb-12 font-mono">
              You will receive an email confirmation shortly at {formData.email}
            </p>
            <Link href="/" className="border border-brand-gold text-brand-gold px-8 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold hover:text-black transition-all inline-block font-mono">
              Return to Archive
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-theme text-theme-primary">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl mb-6 uppercase tracking-wide font-mono">Cart Empty</h1>
          <p className="text-theme-muted mb-8 font-mono">
            Please add items to your cart before checkout.
          </p>
          <Link href="/" className="border border-theme px-8 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all inline-block font-mono">
            Browse Archive
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 text-xs text-theme-muted font-mono">
          <Link href="/" className="hover:text-theme-primary transition-colors">HOME</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-theme-primary transition-colors">CART</Link>
          <span className="mx-2">/</span>
          <span className="text-theme-primary">CHECKOUT</span>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 uppercase tracking-wide font-mono">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="fullName" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-transparent border border-theme px-4 py-3 text-sm font-mono focus:border-brand-teal focus:outline-none transition-colors text-theme-primary"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border border-theme px-4 py-3 text-sm font-mono focus:border-brand-teal focus:outline-none transition-colors text-theme-primary"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border border-theme px-4 py-3 text-sm font-mono focus:border-brand-teal focus:outline-none transition-colors text-theme-primary"
                  placeholder="+880 1234 567890"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-transparent border border-theme px-4 py-3 text-sm font-mono focus:border-brand-teal focus:outline-none transition-colors text-theme-primary"
                  placeholder="House #, Road #, Area, City"
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full border border-brand-gold text-brand-gold px-6 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-theme p-8 sticky top-24 bg-panel">
              <h2 className="text-xs tracking-[0.2em] mb-6 uppercase font-mono">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="text-sm font-mono">
                    <div className="text-theme-primary mb-1">
                      {item.product.title}
                    </div>
                    <div className="text-theme-muted flex justify-between">
                      <span>QTY: {item.quantity}</span>
                      <span className="text-brand-gold">৳{(Number(item.product.price) || 0).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-orange pt-4 space-y-3 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-theme-muted">Subtotal</span>
                  <span className="text-brand-gold">৳{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Delivery Charge</span>
                  <span className="text-brand-gold">৳{deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg pt-3 border-t border-brand-orange">
                  <span>Total</span>
                  <span className="text-brand-gold">৳{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
