'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/utils';
import { Mail, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.user.isOnboarded) {
        router.push('/onboarding');
      } else {
        router.push('/feed');
      }
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl gradient-bg text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md">
              C
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="text-xs text-gray-500">Log in to reconnect with your circles</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Log In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials helper for reviewers */}
          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-[11px] text-purple-900 space-y-1">
            <p className="font-bold">Test Demo Accounts:</p>
            <p>Admin: <code className="bg-white px-1.5 py-0.5 rounded text-purple-700 font-mono">admin@circlely.app</code> / <code className="bg-white px-1.5 py-0.5 rounded text-purple-700 font-mono">password123</code></p>
            <p>User: <code className="bg-white px-1.5 py-0.5 rounded text-purple-700 font-mono">alex@example.com</code> / <code className="bg-white px-1.5 py-0.5 rounded text-purple-700 font-mono">password123</code></p>
          </div>

          <div className="text-center pt-2 text-xs text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-purple-600 hover:underline">
              Join for Free
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
