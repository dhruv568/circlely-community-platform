import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { SITE_CONFIG } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

export default async function FAQPage() {
  const user = await getSessionUser();

  const faqs = [
    {
      q: `What is ${SITE_CONFIG.name}?`,
      a: 'Circlely is a modern community platform designed for adults to discover welcoming interest-based circles, participate in group activities, attend events, and build authentic friendships.',
    },
    {
      q: 'Is this a dating platform?',
      a: 'No. Circlely is strictly a community and friendship platform. Our focus is on shared interests, group activities, and welcoming circles.',
    },
    {
      q: 'Who can join Circlely?',
      a: 'Any adult aged 18 and above who agrees to abide by our Community Guidelines and respectful interaction standards.',
    },
    {
      q: 'How do communities work?',
      a: 'Communities (or Circles) are interest-based spaces centered around specific topics like Gaming, Travel, Creative Arts, Books, or Fitness. Members can post, comment, create polls, and launch activities.',
    },
    {
      q: 'How do I report or block someone?',
      a: 'Every user profile, post, comment, and message features a 1-click Report button. You can also block any user instantly from their profile or chat settings.',
    },
    {
      q: 'Is my personal information private?',
      a: 'Yes! You have full control over your profile visibility. You can choose whether your age or city is shown, or set your entire profile to Private.',
    },
    {
      q: 'How do I create a new community?',
      a: 'Registered members can easily launch a new community from the Communities directory page by specifying a title, description, category, and rules.',
    },
    {
      q: 'How do I delete my account?',
      a: 'You can export your data or permanently delete your account anytime from your Account & Privacy Settings page.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Got Questions?
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between list-none">
                <span>{f.q}</span>
                <span className="text-purple-600 font-extrabold text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
