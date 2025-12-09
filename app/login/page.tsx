'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center group">
            <span className="text-2xl font-extrabold text-theme-primary tracking-[0.2em] font-mono group-hover:text-brand-orange transition-colors">TRI AXIS</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-panel p-8 border border-theme">
          <h2 className="text-2xl font-bold text-theme-primary mb-6 font-mono uppercase tracking-wide">Login</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mb-4 font-mono text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-theme px-4 py-3 text-sm font-mono focus:border-brand-teal focus:outline-none transition-colors text-theme-primary"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-theme px-4 py-3 text-sm font-mono focus:border-brand-teal focus:outline-none transition-colors text-theme-primary"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between font-mono text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-theme bg-transparent text-brand-orange focus:ring-brand-orange" />
                <span className="ml-2 text-theme-muted">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-brand-teal hover:text-brand-orange transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-brand-orange text-brand-orange px-6 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-orange hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-mono text-theme-muted">
            Don't have an account?{' '}
            <Link href="/register" className="text-brand-teal hover:text-brand-orange transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

