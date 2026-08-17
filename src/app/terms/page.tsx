import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { SITE_CONFIG } from '@/lib/utils';
import { Info } from 'lucide-react';

export default async function TermsPage() {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-4 text-center">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">Terms of Service</h1>
          <p className="text-xs text-gray-400">Last updated: August 15, 2026</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <Info className="w-5 h-5 shrink-0 text-amber-600" />
          <span>Notice: This document serves as a production placeholder and should be reviewed by a qualified legal professional before commercial launch.</span>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p>
            By creating an account on {SITE_CONFIG.name}, you agree to abide by these Terms of Service, our Community Guidelines, and Privacy Policy.
          </p>

          <h2 className="text-xl font-bold text-gray-900">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age to register and use {SITE_CONFIG.name}. Accounts created by minors will be terminated immediately.
          </p>

          <h2 className="text-xl font-bold text-gray-900">3. Prohibited Conduct</h2>
          <p>
            You agree not to engage in harassment, spam, hate speech, illegal acts, impersonation, or unauthorized commercial solicitation.
          </p>
        </div>
      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
