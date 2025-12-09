'use client';

import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { X, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-theme text-theme-primary">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl mb-6 uppercase tracking-wide font-mono">Cart Empty</h1>
          <p className="text-theme-muted mb-8 font-mono">
            Your cart is currently empty. Browse the archive to add papers.
          </p>
          <Link 
            href="/"
            className="border border-theme px-8 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all inline-block font-mono"
          >
            Return to Archive
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-xs text-theme-muted font-mono">
          <Link href="/" className="hover:text-theme-primary transition-colors">HOME</Link>
          <span className="mx-2">/</span>
          <span className="text-theme-primary">CART</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 uppercase tracking-wide font-mono">
            Shopping Cart
          </h1>
          <p className="text-theme-muted font-mono text-sm">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="border border-theme p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="text-xs text-theme-muted mb-2 font-mono tracking-[0.15em] uppercase">
                      {item.type}
                    </div>
                    <h3 className="text-lg mb-2 font-mono">
                      {item.product.title}
                    </h3>
                    <div className="text-sm text-theme-muted font-mono">
                      {item.type === 'paper' && 'paper' in item.product ? (
                        <>
                          {(item.product as any).year} • {(item.product as any).paper_number || 'Paper 1'}
                        </>
                      ) : (
                        item.product.description
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-theme-muted hover:text-theme-primary transition-colors ml-4"
                  >
                    <X className="h-5 w-5" strokeWidth={1} />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-theme-muted font-mono">QTY:</span>
                    <div className="flex items-center gap-2 border border-theme">
                      <button 
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="px-3 py-1 hover:bg-theme transition-colors"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1} />
                      </button>
                      <span className="px-3 font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="px-3 py-1 hover:bg-theme transition-colors"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1} />
                      </button>
                    </div>
                  </div>
                  <div className="text-xl font-mono text-brand-gold">
                    ৳{(Number(item.product.price) || 0).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-theme-muted hover:text-brand-orange transition-colors font-mono"
            >
              CLEAR CART
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-theme p-8 sticky top-24 bg-panel">
              <h2 className="text-xs tracking-[0.2em] mb-6 uppercase font-mono">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-theme-muted">Subtotal</span>
                  <span className="text-brand-gold">৳{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Processing Fee</span>
                  <span>৳0.00</span>
                </div>
                <div className="border-t border-brand-orange pt-4 flex justify-between text-lg">
                  <span>Total</span>
                  <span className="text-brand-gold">৳{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full border border-brand-gold text-brand-gold px-6 py-4 text-center text-sm uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-black transition-all font-mono"
              >
                Checkout
              </Link>
              
              <Link
                href="/"
                className="block text-center text-sm text-theme-muted hover:text-theme-primary transition-colors mt-4 font-mono"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
