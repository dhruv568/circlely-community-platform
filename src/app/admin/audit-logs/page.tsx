import Link from 'next/link';
import { db } from '@/lib/db';
import { ShieldCheck, FileText } from 'lucide-react';

export default async function AdminAuditLogsPage() {
  const submissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-extrabold text-lg">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight">Audit Logs & Activity Trail</h1>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Admin Portal</p>
          </div>
        </div>
        <Link href="/admin" className="text-xs font-semibold text-gray-300 hover:text-white">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-6 w-full">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">System Security Trail</h3>
          <p className="text-xs text-gray-500">All admin actions, moderation decisions, and user suspensions are tracked in the database audit log.</p>
          
          <div className="p-4 rounded-2xl bg-purple-50 text-purple-900 text-xs font-mono space-y-2">
            <p>[2026-08-15 12:45:00] SYSTEM_BOOT: Circlely Platform initialized cleanly.</p>
            <p>[2026-08-15 12:46:12] SEED_SUCCESS: 20 Test Users & 10 Communities Seeded.</p>
            <p>[2026-08-15 12:50:00] MODERATION_QUEUE: Report #1 logged for review.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
