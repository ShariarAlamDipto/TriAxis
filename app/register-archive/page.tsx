'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-pure-black text-off-white">
      {/* Header */}
      <header className="border-b border-accent-subtle">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm tracking-archive uppercase hover:text-highlight transition-colors">
            TRI AXIS
          </Link>
        </div>
      </header>

      {/* Registration Form */}
      <main className="max-w-md mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-xs tracking-archive mb-4 text-muted-grey">
            CREATE ACCOUNT
          </h1>
          <p className="text-sm text-muted-grey">
            Register to access the archive
          </p>
        </div>

        {error && (
          <div className="bg-dark-grey border border-accent-subtle px-4 py-3 mb-6 text-sm text-off-white">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-xs tracking-archive mb-2 text-muted-grey">
              FULL NAME
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent border border-accent-subtle px-4 py-3 text-sm focus:border-off-white focus:outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs tracking-archive mb-2 text-muted-grey">
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-accent-subtle px-4 py-3 text-sm focus:border-off-white focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs tracking-archive mb-2 text-muted-grey">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-accent-subtle px-4 py-3 text-sm focus:border-off-white focus:outline-none transition-colors"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs tracking-archive mb-2 text-muted-grey">
              CONFIRM PASSWORD
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border border-accent-subtle px-4 py-3 text-sm focus:border-off-white focus:outline-none transition-colors"
              placeholder="Re-enter password"
            />
          </div>

          <div className="flex items-start pt-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-1 bg-transparent border border-accent-subtle"
            />
            <label htmlFor="terms" className="ml-3 text-xs text-muted-grey leading-relaxed">
              I agree to the{' '}
              <Link href="/terms" className="text-off-white hover:text-highlight transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-off-white hover:text-highlight transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-grey">
          Already have an account?{' '}
          <Link href="/login" className="text-off-white hover:text-highlight transition-colors">
            Login
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-muted-grey hover:text-off-white transition-colors">
            ← Back to Archive
          </Link>
        </div>
      </main>
    </div>
  );
}
