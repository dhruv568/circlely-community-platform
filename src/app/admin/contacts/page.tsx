import Link from 'next/link';
import { db } from '@/lib/db';
import { Mail, CheckCircle2 } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
  let submissions: any[] = [];
  try {
    submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.error('Error fetching contact submissions:', err);
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-extrabold text-lg">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight">Contact Submissions</h1>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Admin Portal</p>
          </div>
        </div>
        <Link href="/admin" className="text-xs font-semibold text-gray-300 hover:text-white">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-6 w-full">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
          {submissions.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400 space-y-2">
              <Mail className="w-8 h-8 mx-auto text-gray-300" />
              <p>No contact submissions recorded yet.</p>
            </div>
          ) : (
            submissions.map((sub) => (
              <div key={sub.id} className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{sub.name}</span>
                    <span className="text-xs text-purple-600 font-medium">({sub.email})</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{timeAgo(sub.createdAt)}</span>
                </div>
                <p className="font-bold text-xs text-gray-800">Subject: {sub.subject}</p>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  {sub.message}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
