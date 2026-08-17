import Link from 'next/link';
import { db } from '@/lib/db';
import { Users, Sparkles, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCommunitiesPage() {
  let communities: any[] = [];
  try {
    communities = await db.community.findMany({
      orderBy: { memberCount: 'desc' },
      include: { creator: true },
    });
  } catch (err) {
    console.error('Error fetching admin communities:', err);
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-extrabold text-lg">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight">Community Management</h1>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Admin Portal</p>
          </div>
        </div>
        <Link href="/admin" className="text-xs font-semibold text-gray-300 hover:text-white">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-6 w-full">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase text-gray-400 font-bold tracking-wider">
              <tr>
                <th className="p-4">Circle</th>
                <th className="p-4">Category</th>
                <th className="p-4">Age Group</th>
                <th className="p-4">Members</th>
                <th className="p-4">Creator</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {communities.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                    <span>{c.icon || '💬'}</span>
                    <Link href={`/communities/${c.slug}`} className="hover:text-purple-600">
                      {c.name}
                    </Link>
                  </td>
                  <td className="p-4 font-semibold text-purple-700">{c.category}</td>
                  <td className="p-4 text-gray-600">{c.ageGroup}</td>
                  <td className="p-4 font-bold text-gray-800">{c.memberCount}</td>
                  <td className="p-4 text-gray-500">{c.creator.name}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/communities/${c.slug}`}
                      className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold hover:bg-purple-100"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
