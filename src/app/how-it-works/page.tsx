import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { SITE_CONFIG } from '@/lib/utils';
import { UserPlus, Sparkles, Users, MessageSquare, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default async function HowItWorksPage() {
  const user = await getSessionUser();

  const steps = [
    {
      step: '01',
      title: 'Create Your Private Profile',
      desc: 'Sign up for free in 60 seconds. Set your bio, location, and control exactly what information is visible to others.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Select Interests & Age Preference',
      desc: 'Pick your favourite hobbies (gaming, travel, music, books, photography) and optional age bracket filter.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Join Welcoming Circles',
      desc: 'Explore active moderated communities and join discussions, share posts, and vote in community polls.',
      icon: Users,
    },
    {
      step: '04',
      title: 'Take Part in Activities & Events',
      desc: 'Join member hangouts, online gaming sessions, photowalks, and workshops to meet people naturally.',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">How {SITE_CONFIG.name} Works</h1>
          <p className="text-gray-600 text-base">
            Building meaningful adult friendships should feel natural, safe, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 relative">
                <span className="text-3xl font-extrabold gradient-text">{s.step}</span>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/register"
            className="px-8 py-4 rounded-2xl text-base font-bold text-white gradient-bg shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
