'use client';

import { useState } from 'react';
import { ShieldAlert, X, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'USER' | 'POST' | 'COMMENT' | 'MESSAGE' | 'COMMUNITY' | 'EVENT';
  targetId: string;
  targetName?: string;
}

export function ReportModal({ isOpen, onClose, targetType, targetId, targetName }: ReportModalProps) {
  const [reason, setReason] = useState('Spam');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const reasons = [
    'Spam or misleading',
    'Harassment or bullying',
    'Hate speech or discrimination',
    'Scam or fraud attempt',
    'Fake account or impersonation',
    'Inappropriate or explicit content',
    'Threat of violence',
    'Other safety concern',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType,
          targetId,
          reason,
          details,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Report Submitted</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Thank you for keeping Circlely safe. Our moderation team will review this report within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white gradient-bg shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Report {targetType.toLowerCase()}</h3>
                <p className="text-xs text-gray-500">{targetName ? `Target: ${targetName}` : 'Help us maintain a safe community'}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                {reasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Additional details (Optional)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Provide context or specific details to help our moderation team..."
                className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
