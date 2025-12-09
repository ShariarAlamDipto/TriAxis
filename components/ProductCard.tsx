'use client';

import { useCart } from '@/contexts/CartContext';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  paper: any;
  category?: string;
}

export default function ProductCard({ paper, category }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  
  const isInCart = items.some(item => item.product.id === paper.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(paper, 'paper');
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart(paper, 'paper');
    }
    window.location.href = '/checkout';
  };

  return (
    <div className="border border-theme hover:border-brand-orange transition-all group">
      {/* Image Section */}
      <div className="aspect-[3/4] bg-panel relative overflow-hidden group-hover:bg-brand-teal/10 transition-all">
        {paper.image_url ? (
          <Image
            src={paper.image_url}
            alt={paper.title || paper.subject?.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-theme-muted font-mono text-xs tracking-[0.2em]">
              NO IMAGE
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Category Badge */}
        {category && (
          <div className="text-xs text-theme-muted mb-3 font-mono tracking-[0.15em]">
            {category}
          </div>
        )}

        {/* Paper Title */}
        <h3 className="text-lg mb-2 font-mono group-hover:text-theme-primary transition-colors">
          {paper.title || `${paper.subject?.name} (${paper.subject?.code})`}
        </h3>

        {/* Metadata */}
        <div className="text-sm text-theme-muted mb-4 font-mono">
          {paper.year} • {paper.variant || 'Paper 1'}
        </div>

        {/* Price */}
        <div className="text-2xl mb-6 font-mono text-brand-gold">
          ৳{typeof paper.price === 'number' ? paper.price.toFixed(2) : '299'}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {!isInCart ? (
            <>
              <button
                onClick={handleBuyNow}
                className="w-full border border-theme px-4 py-3 text-sm uppercase tracking-[0.15em] hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all font-mono"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full border border-theme px-4 py-3 text-sm uppercase tracking-[0.15em] hover:border-brand-orange transition-all font-mono flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" strokeWidth={1} />
                Add to Cart
              </button>
            </>
          ) : (
            <div className="w-full border border-brand-teal px-4 py-3 text-sm uppercase tracking-[0.15em] font-mono flex items-center justify-center gap-2 text-brand-teal">
              <Check className="h-4 w-4" strokeWidth={1} />
              {justAdded ? 'Added' : 'In Cart'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
