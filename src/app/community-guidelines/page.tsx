import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { SITE_CONFIG } from '@/lib/utils';

export default async function CommunityGuidelinesPage() {
  const user = await getSessionUser();

  const rules = [
    { title: '1. Be Respectful & Welcoming', desc: 'Treat all members with kindness and empathy regardless of background, identity, or skill level.' },
    { title: '2. No Harassment or Bullying', desc: 'Targeted insults, persistent unwanted contact, or aggressive language will lead to immediate account suspension.' },
    { title: '3. No Hate Speech or Discrimination', desc: 'Racism, sexism, homophobia, religious intolerance, or bigotry of any form is strictly forbidden.' },
    { title: '4. No Commercial Spam or Scams', desc: 'Do not use communities or private messages to push unsolicited commercial links, crypto schemes, or MLM offers.' },
    { title: '5. Respect Personal Privacy', desc: 'Do not share private messages, phone numbers, or personal identifying information of others without explicit consent.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-4 text-center">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Safety & Standards
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">Community Guidelines</h1>
          <p className="text-sm text-gray-600">The standards that keep {SITE_CONFIG.name} safe and welcoming for everyone.</p>
        </div>

        <div className="space-y-4">
          {rules.map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
              <h3 className="font-bold text-lg text-gray-900">{r.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
