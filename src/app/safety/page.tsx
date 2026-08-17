import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { ShieldCheck, Lock, AlertTriangle, UserX, EyeOff, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default async function SafetyPage() {
  const user = await getSessionUser();

  const safetyPillars = [
    {
      title: 'Zero Tolerance for Harassment & Hate',
      desc: 'We immediately suspend accounts engaged in bullying, hate speech, unwanted sexual advances, or abusive behavior.',
      icon: ShieldCheck,
    },
    {
      title: 'Granular Privacy Controls',
      desc: 'You decide whether your age, city, or full profile is visible publicly, to community members only, or completely private.',
      icon: Lock,
    },
    {
      title: 'Blocking & Silent Muting',
      desc: 'Block any user with 1 click. Blocked users cannot view your profile, send messages, or comment on your posts.',
      icon: UserX,
    },
    {
      title: 'Scam & Impersonation Protection',
      desc: 'Our moderation team monitors suspicious activity, fake profiles, and commercial spam continuously.',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-green-700 bg-green-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-green-200">
            Safety Center
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">Your Safety is Our Top Priority</h1>
          <p className="text-gray-600 text-base">
            Circlely is built exclusively for respectful adult interactions. Learn how we keep our platform safe and trustworthy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safetyPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Contact Support */}
        <div className="bg-purple-900 text-white p-8 rounded-3xl text-center space-y-4">
          <h3 className="text-2xl font-extrabold">Need Assistance or Want to Report an Incident?</h3>
          <p className="text-purple-200 text-sm max-w-xl mx-auto">
            Our dedicated trust and safety team reviews reports 24/7.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-2xl bg-white text-purple-900 font-bold text-sm hover:bg-purple-50 transition-colors shadow-lg"
          >
            Contact Safety Team
          </Link>
        </div>
      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
