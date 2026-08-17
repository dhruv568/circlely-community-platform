import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { SITE_CONFIG } from '@/lib/utils';
import { ShieldCheck, Info } from 'lucide-react';

export default async function PrivacyPage() {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-4 text-center">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Legal & Compliance
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="text-xs text-gray-400">Last updated: August 15, 2026</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <Info className="w-5 h-5 shrink-0 text-amber-600" />
          <span>Notice: This document serves as a production placeholder and should be reviewed by a qualified legal professional before commercial launch.</span>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
          <p>
            When you register for {SITE_CONFIG.name}, we collect basic account information including your name, email address, date of birth, password hash, and optional profile details such as your city, bio, and interests.
          </p>

          <h2 className="text-xl font-bold text-gray-900">2. How We Use Your Data</h2>
          <p>
            We use your data strictly to operate the platform: recommending relevant interest circles, enabling community interactions, facilitating private messaging between connected members, and preventing fraud or abuse.
          </p>

          <h2 className="text-xl font-bold text-gray-900">3. Profile Privacy & Visibility</h2>
          <p>
            You maintain full granular control over your profile visibility. You can toggle whether your profile is public, visible to community members only, or completely private.
          </p>

          <h2 className="text-xl font-bold text-gray-900">4. Account Deletion & Data Export</h2>
          <p>
            You may request a complete export of your personal data or permanently delete your account at any time via Account Settings.
          </p>
        </div>
      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
