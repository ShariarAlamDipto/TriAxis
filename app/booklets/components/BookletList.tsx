'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Booklet } from '@/types/database';

interface BookletListProps {
  booklets: Booklet[];
}

export default function BookletList({ booklets }: BookletListProps) {
  const { addToCart } = useCart();

  if (booklets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-theme-muted font-mono">No booklets available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {booklets.map((booklet) => (
        <div key={booklet.id} className="border border-theme hover:border-brand-orange transition-all group bg-panel">
          <div className="aspect-[3/4] bg-theme relative overflow-hidden group-hover:bg-brand-teal/10 transition-all">
            {booklet.cover_image_url ? (
              <Image
                src={booklet.cover_image_url}
                alt={booklet.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-theme-muted font-mono text-sm">NO IMAGE</div>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl mb-3 uppercase tracking-wide font-mono text-theme-primary group-hover:text-brand-orange transition-colors">
              {booklet.title}
            </h3>
            <p className="text-theme-muted font-mono text-xs mb-4">
              {booklet.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-mono text-brand-gold">৳{booklet.price}</div>
              <button 
                onClick={() => addToCart(booklet, 'booklet')}
                className="border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all text-xs px-6 py-3 uppercase tracking-[0.15em] font-mono"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
