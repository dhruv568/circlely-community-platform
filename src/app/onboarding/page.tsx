'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  User, 
  Sparkles, 
  Users, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Check
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [bio, setBio] = useState('Passionate about travel, acoustic guitar, and meeting like-minded people!');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300');
  const [city, setCity] = useState('San Francisco');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Gaming', 'Travel', 'Technology']);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>(['young-professionals-circle', 'travel-circle']);
  const [isPublic, setIsPublic] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [loading, setLoading] = useState(false);

  const availableInterests = [
    { name: 'Gaming', icon: '🎮' },
    { name: 'Music', icon: '🎵' },
    { name: 'Movies', icon: '🎬' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Books', icon: '📚' },
    { name: 'Art', icon: '🎨' },
    { name: 'Technology', icon: '💻' },
    { name: 'Fitness', icon: '🏋️' },
    { name: 'Food', icon: '🍳' },
    { name: 'Photography', icon: '📸' },
    { name: 'Career', icon: '💼' },
    { name: 'Personal Growth', icon: '🌱' },
  ];

  const availableCommunities = [
    { name: 'Young Professionals Circle', slug: 'young-professionals-circle', category: 'Professional', icon: '💼' },
    { name: 'Gaming Community', slug: 'gaming-community', category: 'Entertainment', icon: '🎮' },
    { name: 'Travel Circle', slug: 'travel-circle', category: 'Lifestyle', icon: '✈️' },
    { name: 'Creative Circle', slug: 'creative-circle', category: 'Creativity', icon: '🎨' },
    { name: 'Fitness Circle', slug: 'fitness-circle', category: 'Health', icon: '🏋️' },
    { name: 'Movie & Music Circle', slug: 'movie-music-circle', category: 'Entertainment', icon: '🎬' },
  ];

  const toggleInterest = (name: string) => {
    if (selectedInterests.includes(name)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== name));
    } else {
      setSelectedInterests([...selectedInterests, name]);
    }
  };

  const toggleCommunity = (slug: string) => {
    if (selectedCommunities.includes(slug)) {
      setSelectedCommunities(selectedCommunities.filter((c) => c !== slug));
    } else {
      setSelectedCommunities([...selectedCommunities, slug]);
    }
  };

  const handleFinishOnboarding = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio,
          avatarUrl,
          city,
          interests: selectedInterests,
          communitySlugs: selectedCommunities,
          isPublic,
          allowMessages,
        }),
      });

      if (res.ok) {
        router.push('/feed');
        router.refresh();
      }
    } catch {
      router.push('/feed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        
        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Step {step} of 6</span>
            <span className="text-purple-600 font-extrabold">{Math.round((step / 6) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full gradient-bg transition-all duration-300 rounded-full"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: Bio & Avatar */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-extrabold text-2xl text-gray-900">Step 1: Tell Us About Yourself</h2>
              <p className="text-xs text-gray-500">Your bio helps members with similar interests introduce themselves.</p>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-300"
              />
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Share your hobbies, what you love doing on weekends, or what brings you to Circlely..."
                className="w-full p-3.5 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-md flex items-center justify-center gap-2"
            >
              <span>Next: Choose Interests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Choose Interests */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-extrabold text-2xl text-gray-900">Step 2: Choose Your Interests</h2>
              <p className="text-xs text-gray-500">Select topics you love. We will curate recommended circles for you.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableInterests.map((item) => {
                const isSelected = selectedInterests.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleInterest(item.name)}
                    className={`p-3.5 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-purple-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-3.5 px-6 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-md flex items-center justify-center gap-2"
              >
                <span>Next: Preferred Circles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Preferred Communities */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-extrabold text-2xl text-gray-900">Step 3: Join Initial Circles</h2>
              <p className="text-xs text-gray-500">Pick circles to add directly to your personal home feed.</p>
            </div>

            <div className="space-y-3">
              {availableCommunities.map((comm) => {
                const isSelected = selectedCommunities.includes(comm.slug);
                return (
                  <div
                    key={comm.slug}
                    onClick={() => toggleCommunity(comm.slug)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected ? 'bg-purple-50 border-purple-500 text-purple-900' : 'bg-white border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{comm.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm">{comm.name}</h4>
                        <span className="text-xs text-purple-600 font-semibold">{comm.category}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {isSelected ? 'Selected' : '+ Select'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-3.5 px-6 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-md flex items-center justify-center gap-2"
              >
                <span>Next: Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Location */}
        {step === 4 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-extrabold text-2xl text-gray-900">Step 4: Your City / Location</h2>
              <p className="text-xs text-gray-500">Connecting with local members enables offline meetups and photowalks.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Primary City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. San Francisco, New York, Austin"
                className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(3)}
                className="py-3.5 px-6 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-md flex items-center justify-center gap-2"
              >
                <span>Next: Privacy Controls</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Privacy Settings */}
        {step === 5 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-extrabold text-2xl text-gray-900">Step 5: Privacy Preferences</h2>
              <p className="text-xs text-gray-500">Configure how visible your profile is to other members.</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Public Profile Visibility</h4>
                  <p className="text-xs text-gray-500">Allow other verified Circlely members to discover your profile</p>
                </div>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Direct Private Messages</h4>
                  <p className="text-xs text-gray-500">Allow connections and circle members to send you private messages</p>
                </div>
                <input
                  type="checkbox"
                  checked={allowMessages}
                  onChange={(e) => setAllowMessages(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded"
                />
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(4)}
                className="py-3.5 px-6 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-md flex items-center justify-center gap-2"
              >
                <span>Next: Final Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Recommended Circles & Finish */}
        {step === 6 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 text-center animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-extrabold text-2xl text-gray-900">You are All Set!</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Your profile has been configured with your selected interests and privacy settings. Welcome to Circlely!
              </p>
            </div>

            <button
              onClick={handleFinishOnboarding}
              disabled={loading}
              className="w-full py-4 rounded-2xl text-base font-bold text-white gradient-bg shadow-xl shadow-purple-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>{loading ? 'Entering Platform...' : 'Enter Circlely Community Feed'}</span>
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
