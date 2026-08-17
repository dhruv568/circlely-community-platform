import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SITE_CONFIG } from '@/lib/utils';
import { InteractiveHero } from '@/components/home/InteractiveHero';
import { InteractiveCommunitiesSection } from '@/components/home/InteractiveCommunitiesSection';
import { CommunityNetworkGraph } from '@/components/home/CommunityNetworkGraph';
import { ActivityTimeline } from '@/components/activity/ActivityTimeline';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  Compass, 
  CheckCircle2
} from 'lucide-react';

export default async function HomePage() {
  const user = await getSessionUser();

  const featuredCommunities = await db.community.findMany({ take: 6, orderBy: { memberCount: 'desc' } });

  const ageGroups = [
    { range: '18–24', title: 'Young Adults', desc: 'College, early career, gaming & vibrant social circles.', icon: '🎓' },
    { range: '25–34', title: 'Young Professionals', desc: 'Networking, weekend trips, culinary hangouts & hobbies.', icon: '💼' },
    { range: '35–49', title: 'Life & Growth', desc: 'Parenting, career pivots, fitness, wellness & deep talks.', icon: '🌱' },
    { range: '50–64', title: 'Experience & Passion', desc: 'Arts, outdoor adventures, literature & classic music.', icon: '🎨' },
    { range: '65+', title: 'Wisdom & Leisure', desc: 'Book discussions, walking groups, chess & lifelong learning.', icon: '🏛️' },
  ];

  const features = [
    {
      title: 'Meaningful Connections',
      desc: 'Connect with people who share your genuine passions rather than endless superficial swipes.',
      icon: Heart,
    },
    {
      title: 'Interest-Based Circles',
      desc: 'Join moderated groups tailored to gaming, travel, music, tech, books, and fitness.',
      icon: Users,
    },
    {
      title: 'Group Activities & Meetups',
      desc: 'Participate in online game nights, weekend hikes, coffee workshops, and local meetups.',
      icon: Sparkles,
    },
    {
      title: 'Privacy & Safety First',
      desc: 'Verified profiles, granular privacy controls, active moderation, and 1-click reporting.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar user={user} />
      <CommandPalette />

      {/* HERO SECTION */}
      <InteractiveHero user={user} />

      {/* TRUST STRIP COUNTER (Requirement #8) */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold gradient-text">
                <CountUpNumber end={10000} suffix="+" />
              </p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Members</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold gradient-text">
                <CountUpNumber end={120} suffix="+" />
              </p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Interest Circles</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold gradient-text">
                <CountUpNumber end={500} suffix="+" />
              </p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Group Activities</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold gradient-text">
                <CountUpNumber end={50} suffix="+" />
              </p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cities Worldwide</p>
            </div>

          </div>
        </div>
      </section>

      {/* WHY THIS PLATFORM (Requirement #9) */}
      <section className="py-20 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              More Than Social Media
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Designed for Real Connections & Friendship
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              No doom-scrolling or algorithm traps. Built from the ground up for genuine adult community experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FIND YOUR CIRCLE / FEATURED COMMUNITIES (Requirement #10) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Explore Circles</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Find Your Circle</h2>
          </div>

          <InteractiveCommunitiesSection initialCommunities={featuredCommunities} />
        </div>
      </section>

      {/* INTERACTIVE COMMUNITY NETWORK GRAPH (Requirement #12) */}
      <section className="py-16 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityNetworkGraph />
        </div>
      </section>

      {/* AGE-BASED DISCOVERY SECTION (Requirement #11) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Tailored Experience</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Discover Circles by Age Bracket</h2>
            <p className="text-sm text-gray-600">
              Optional age-filtered groups ensure you meet peers at similar life stages. You can also explore purely by interest!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ageGroups.map((group) => (
              <Link
                key={group.range}
                href={`/communities?ageGroup=${encodeURIComponent(group.range)}`}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all text-center space-y-3 group"
              >
                <span className="text-3xl block group-hover:scale-110 transition-transform">{group.icon}</span>
                <span className="inline-block px-3 py-1 text-xs font-extrabold rounded-full bg-indigo-100 text-indigo-700">
                  {group.range}
                </span>
                <h3 className="font-bold text-base text-gray-900">{group.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{group.desc}</p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ACTIVITIES TIMELINE SECTION (Requirement #13) */}
      <section className="py-20 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ActivityTimeline />
        </div>
      </section>

      {/* SAFETY & TRUST BANNER */}
      <section className="py-16 gradient-bg text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl font-extrabold">Your Safety & Privacy are Non-Negotiable</h2>
            <p className="text-indigo-100 text-sm leading-relaxed">
              We enforce strict community guidelines, 24/7 moderation queue, and user verification so you can build friendships in a safe, welcoming environment.
            </p>
          </div>
          <Link href="/safety">
            <MagneticButton variant="outline" size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 border-none">
              Visit Safety Center
            </MagneticButton>
          </Link>
        </div>
      </section>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
