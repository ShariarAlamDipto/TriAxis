'use client';

import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { getItemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  return (
    <nav className="border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Left - Brand & Nav Items */}
          <div className="flex items-center gap-12">
            <Link 
              href="/" 
              className="text-sm tracking-[0.2em] uppercase text-theme-secondary hover:text-brand-orange transition-colors font-mono"
            >
              TRI AXIS
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/subjects/igcse" 
                className="text-sm tracking-[0.15em] uppercase text-theme-secondary hover:text-theme-primary transition-colors group relative font-mono"
              >
                IGCSE PAST PAPERS
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-orange transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="/subjects/ial" 
                className="text-sm tracking-[0.15em] uppercase text-theme-secondary hover:text-theme-primary transition-colors group relative font-mono"
              >
                IAL PAST PAPERS
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-orange transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="/booklets" 
                className="text-sm tracking-[0.15em] uppercase text-theme-secondary hover:text-theme-primary transition-colors group relative font-mono"
              >
                BUY BOOKLETS
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-orange transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          {/* Right - Theme Toggle & Cart Icon */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="transition-colors hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" strokeWidth={1} />
              ) : (
                <Moon className="h-5 w-5" strokeWidth={1} />
              )}
            </button>

            <Link 
              href="/cart" 
              className="relative transition-colors hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 text-white text-[8px] flex items-center justify-center font-mono" style={{ backgroundColor: 'var(--brand-orange)' }}>
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden transition-colors hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-white/20 space-y-4">
            <Link 
              href="/subjects/igcse" 
              className="block text-sm tracking-[0.15em] uppercase hover:text-brand-orange transition-colors font-mono"
              onClick={() => setMobileMenuOpen(false)}
            >
              IGCSE PAST PAPERS
            </Link>
            <Link 
              href="/subjects/ial" 
              className="block text-sm tracking-[0.15em] uppercase hover:text-brand-orange transition-colors font-mono"
              onClick={() => setMobileMenuOpen(false)}
            >
              IAL PAST PAPERS
            </Link>
            <Link 
              href="/booklets" 
              className="block text-sm tracking-[0.15em] uppercase hover:text-brand-orange transition-colors font-mono"
              onClick={() => setMobileMenuOpen(false)}
            >
              BUY BOOKLETS
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
