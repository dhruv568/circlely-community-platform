'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Mail, CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to send message.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            We are here to help
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Have a question, feedback, or safety concern? Send us a message and our support team will reply within 24 hours.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-xl mx-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900">Message Received!</h3>
              <p className="text-sm text-gray-600">
                Thank you for reaching out. We have logged your request and our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="General Support">General Support</option>
                  <option value="Safety & Moderation">Safety & Moderation Report</option>
                  <option value="Account Inquiry">Account Inquiry</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Business & Partnerships">Business & Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe your inquiry or question..."
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
