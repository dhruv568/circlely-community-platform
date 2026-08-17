import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { SITE_CONFIG } from '@/lib/utils';
import { Users, ShieldCheck, Heart, Sparkles, Globe, Award } from 'lucide-react';

export default async function AboutPage() {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            About {SITE_CONFIG.name}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Building Real Connection in a Digital World
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Circlely was created with a single mission: to help adults find genuine friendships, shared passions, and welcoming communities without the pressure of dating apps or algorithm doom-scrolling.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Friendship-First</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We focus entirely on group activities, interest circles, and genuine adult friendships.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Safety & Moderation</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every member, post, and activity is backed by strict guidelines and active human & automated moderation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Interactive Experiences</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              From virtual gaming tournaments to local hiking meetups, activities bring conversations to life.
            </p>
          </div>
        </div>

      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
