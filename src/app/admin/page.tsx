'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Sparkles, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  BarChart2, 
  TrendingUp, 
  FileText,
  MessageSquare
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AdminStats {
  totalUsers: number;
  totalCommunities: number;
  totalEvents: number;
  totalActivities: number;
  pendingReports: number;
  totalPosts: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 21,
    totalCommunities: 10,
    totalEvents: 10,
    totalActivities: 20,
    pendingReports: 1,
    totalPosts: 30,
  });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totalUsers) setStats(data);
      })
      .catch(() => {});
  }, []);

  const growthData = [
    { month: 'Jan', members: 120, posts: 450 },
    { month: 'Feb', members: 340, posts: 890 },
    { month: 'Mar', members: 680, posts: 1400 },
    { month: 'Apr', members: 1200, posts: 2900 },
    { month: 'May', members: 2400, posts: 4200 },
    { month: 'Jun', members: 4800, posts: 7600 },
    { month: 'Jul', members: 7900, posts: 11200 },
    { month: 'Aug', members: 10450, posts: 14800 },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      
      {/* Admin Top Header */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-extrabold text-lg">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight">Circlely Admin Control Center</h1>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Platform Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/feed" className="text-xs font-semibold text-gray-300 hover:text-white">
            Exit to App →
          </Link>
        </div>
      </header>

      {/* Admin Subnav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-3 flex gap-4 overflow-x-auto text-xs font-bold">
        <Link href="/admin" className="px-3.5 py-2 rounded-xl bg-purple-100 text-purple-700">
          Overview & Metrics
        </Link>
        <Link href="/admin/users" className="px-3.5 py-2 rounded-xl text-gray-600 hover:bg-gray-100">
          User Management
        </Link>
        <Link href="/admin/communities" className="px-3.5 py-2 rounded-xl text-gray-600 hover:bg-gray-100">
          Communities
        </Link>
        <Link href="/admin/moderation" className="px-3.5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 relative">
          Moderation Queue
          {stats.pendingReports > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px]">
              {stats.pendingReports}
            </span>
          )}
        </Link>
        <Link href="/admin/audit-logs" className="px-3.5 py-2 rounded-xl text-gray-600 hover:bg-gray-100">
          Audit Logs
        </Link>
        <Link href="/admin/contacts" className="px-3.5 py-2 rounded-xl text-gray-600 hover:bg-gray-100">
          Contact Requests
        </Link>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-8 w-full">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stats.totalUsers}</p>
            <p className="text-xs text-gray-400 font-semibold uppercase">Total Users</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stats.totalCommunities}</p>
            <p className="text-xs text-gray-400 font-semibold uppercase">Communities</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stats.totalEvents}</p>
            <p className="text-xs text-gray-400 font-semibold uppercase">Events</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stats.totalActivities}</p>
            <p className="text-xs text-gray-400 font-semibold uppercase">Activities</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stats.totalPosts}</p>
            <p className="text-xs text-gray-400 font-semibold uppercase">Community Posts</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-red-600">{stats.pendingReports}</p>
            <p className="text-xs text-gray-400 font-semibold uppercase">Pending Reports</p>
          </div>

        </div>

        {/* Growth Chart */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900">User Growth & Post Engagement Trends</h3>
              <p className="text-xs text-gray-500">Monthly active members and community feed interactions</p>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              +142% YoY Growth
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7A59" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF7A59" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="members" stroke="#6C63FF" strokeWidth={3} fillOpacity={1} fill="url(#colorMembers)" name="Members" />
                <Area type="monotone" dataKey="posts" stroke="#FF7A59" strokeWidth={3} fillOpacity={1} fill="url(#colorPosts)" name="Posts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>

    </div>
  );
}
