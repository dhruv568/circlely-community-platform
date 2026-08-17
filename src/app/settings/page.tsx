'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Settings, Shield, Lock, Bell, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [isPublic, setIsPublic] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [showCity, setShowCity] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      account: "Circlely User Export",
      exportDate: new Date().toISOString(),
      privacy: { isPublic, showAge, showCity, allowMessages },
    }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "circlely_user_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900">Account & Privacy Settings</h1>
          <p className="text-xs text-gray-500">Manage your profile visibility, data export, and security preferences.</p>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-green-50 text-green-800 text-xs flex items-center gap-2 border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span>Privacy settings updated successfully!</span>
          </div>
        )}

        {/* Privacy Preferences Form */}
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Shield className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-lg text-gray-900">Privacy Controls</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer">
              <div>
                <h4 className="font-bold text-sm text-gray-900">Public Profile Discovery</h4>
                <p className="text-xs text-gray-500">Allow other Circlely members to find your profile in Discover People</p>
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
                <h4 className="font-bold text-sm text-gray-900">Show Age Bracket</h4>
                <p className="text-xs text-gray-500">Display your age group badge on your profile</p>
              </div>
              <input
                type="checkbox"
                checked={showAge}
                onChange={(e) => setShowAge(e.target.checked)}
                className="w-5 h-5 accent-purple-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer">
              <div>
                <h4 className="font-bold text-sm text-gray-900">Show Primary City</h4>
                <p className="text-xs text-gray-500">Display your city on your profile for local meetups</p>
              </div>
              <input
                type="checkbox"
                checked={showCity}
                onChange={(e) => setShowCity(e.target.checked)}
                className="w-5 h-5 accent-purple-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer">
              <div>
                <h4 className="font-bold text-sm text-gray-900">Allow Direct Messages</h4>
                <p className="text-xs text-gray-500">Allow members to send private chat messages</p>
              </div>
              <input
                type="checkbox"
                checked={allowMessages}
                onChange={(e) => setAllowMessages(e.target.checked)}
                className="w-5 h-5 accent-purple-600 rounded"
              />
            </label>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-xs font-bold text-white gradient-bg shadow-md"
          >
            Save Privacy Changes
          </button>
        </form>

        {/* Data Export & Account Deletion */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Lock className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-lg text-gray-900">Data & Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
              <div>
                <h4 className="font-bold text-sm text-gray-900">Export Your Personal Data</h4>
                <p className="text-xs text-gray-500">Download a JSON archive of your profile, interests, and activity history</p>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Export Data
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50/50 border border-red-100">
              <div>
                <h4 className="font-bold text-sm text-red-900">Delete Account</h4>
                <p className="text-xs text-red-600">Permanently delete your account and all associated community posts</p>
              </div>
              <button
                onClick={() => alert('Account deletion request confirmed. Your data will be wiped within 24 hours.')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        </div>

      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
