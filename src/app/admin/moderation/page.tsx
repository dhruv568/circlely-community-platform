'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

interface ReportItem {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  details?: string | null;
  status: string;
  createdAt: string;
  reporter: {
    name: string;
    email: string;
  };
}

export default function AdminModerationPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/reports')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setReports(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (reportId: string, status: string, note: string) => {
    try {
      const res = await fetch('/api/admin/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, status, resolutionNote: note }),
      });
      if (res.ok) {
        setReports(reports.map((r) => (r.id === reportId ? { ...r, status } : r)));
      }
    } catch {
      setReports(reports.map((r) => (r.id === reportId ? { ...r, status } : r)));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-extrabold text-lg">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight">Moderation Queue</h1>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Admin Portal</p>
          </div>
        </div>
        <Link href="/admin" className="text-xs font-semibold text-gray-300 hover:text-white">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-6 w-full">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
          {reports.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400 space-y-2">
              <ShieldAlert className="w-8 h-8 mx-auto text-gray-300" />
              <p>No moderation reports in queue.</p>
            </div>
          ) : (
            reports.map((r) => (
              <div key={r.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-extrabold uppercase">
                      {r.targetType}
                    </span>
                    <span className="text-xs font-bold text-gray-900">{r.reason}</span>
                    <span className="text-[10px] text-gray-400">• {timeAgo(r.createdAt)}</span>
                  </div>

                  <p className="text-xs text-gray-600">
                    Reporter: <span className="font-semibold text-gray-800">{r.reporter.name}</span> ({r.reporter.email})
                  </p>

                  {r.details && (
                    <p className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 italic">
                      "{r.details}"
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-bold text-gray-400">Status:</span>
                    <span
                      className={`font-bold ${
                        r.status === 'PENDING'
                          ? 'text-orange-600'
                          : r.status === 'RESOLVED'
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'RESOLVED', 'Action Taken')}
                    className="px-3.5 py-1.5 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 shadow-sm"
                  >
                    Action Taken
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'REJECTED', 'Dismissed')}
                    className="px-3.5 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
                  >
                    Dismiss Report
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
