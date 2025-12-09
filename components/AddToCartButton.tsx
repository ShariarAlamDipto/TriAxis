'use client';

import { useCart } from '@/contexts/CartContext';
import { Paper } from '@/types/database';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
  paper: Paper;
}

export default function AddToCartButton({ paper }: AddToCartButtonProps) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  const isInCart = items.some(item => item.product.id === paper.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInCart) {
      addToCart(paper, 'paper');
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  if (isInCart) {
    return (
      <button 
        className="bg-brand-teal text-white px-4 py-2 font-bold text-xs flex items-center gap-2 cursor-default font-mono uppercase tracking-wider"
        disabled
      >
        <Check className="h-4 w-4" />
        In Cart
      </button>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`px-4 py-2 font-bold text-xs transition-all font-mono uppercase tracking-wider ${
        justAdded
          ? 'bg-brand-teal text-white'
          : 'border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
      }`}
    >
      {justAdded ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
