'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with 'dark' to match server-side rendering and prevent hydration mismatch
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Sync with localStorage/DOM on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('triaxis_theme') as Theme;
    const currentAttr = document.documentElement.getAttribute('data-theme') as Theme;
    
    if (saved && (saved === 'dark' || saved === 'light')) {
      setTheme(saved);
    } else if (currentAttr && (currentAttr === 'dark' || currentAttr === 'light')) {
      setTheme(currentAttr);
    }
  }, []);

  // Update DOM and localStorage when theme changes, but only after mount
  useEffect(() => {
    if (mounted) {
      console.log('Updating theme to:', theme);
      localStorage.setItem('triaxis_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  };

  // Always provide the context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
