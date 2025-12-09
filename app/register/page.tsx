'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/login?registered=true');
    }
  };

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center group">
            <span className="text-2xl font-extrabold text-theme-primary tracking-[0.2em] font-mono group-hover:text-brand-orange transition-colors">TRI AXIS</span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-panel p-8 border border-theme">
          <h2 className="text-2xl font-bold text-theme-primary mb-6 font-mono uppercase tracking-wide">Create Account</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mb-4 font-mono text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <p className="text-xs text-theme-muted mt-2 font-mono">Minimum 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs tracking-[0.2em] mb-3 uppercase font-mono text-theme-muted">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border border-theme px-4 py-3 text-sm font-mono focus:border-brand-teal focus:outline-none transition-colors text-theme-primary"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start font-mono text-sm">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 rounded border-theme bg-transparent text-brand-orange focus:ring-brand-orange"
              />
              <label htmlFor="terms" className="ml-2 text-theme-muted">
                I agree to the{' '}
                <Link href="/terms" className="text-brand-teal hover:text-brand-orange transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-brand-teal hover:text-brand-orange transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-brand-orange text-brand-orange px-6 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-orange hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-mono text-theme-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-teal hover:text-brand-orange transition-colors">
              Login
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center font-mono">
          <Link href="/" className="text-sm text-theme-muted hover:text-theme-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
