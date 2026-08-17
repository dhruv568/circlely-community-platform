import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { ShieldCheck, Heart, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/">
              <Logo size={40} textClassName="text-white text-2xl" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 text-purple-400 border border-gray-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified & Moderated
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 text-orange-400 border border-gray-700">
                <Heart className="w-3.5 h-3.5" />
                Adult Connection
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/communities" className="hover:text-purple-400 transition-colors">Find Communities</Link></li>
              <li><Link href="/activities" className="hover:text-purple-400 transition-colors">Group Activities</Link></li>
              <li><Link href="/events" className="hover:text-purple-400 transition-colors">Events & Meetups</Link></li>
              <li><Link href="/discover" className="hover:text-purple-400 transition-colors">Discover People</Link></li>
              <li><Link href="/how-it-works" className="hover:text-purple-400 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Safety & Support */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Safety & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/safety" className="hover:text-purple-400 transition-colors">Safety Center</Link></li>
              <li><Link href="/community-guidelines" className="hover:text-purple-400 transition-colors">Community Guidelines</Link></li>
              <li><Link href="/faq" className="hover:text-purple-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Circlely</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy#cookie-policy" className="hover:text-purple-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/safety#reporting" className="hover:text-purple-400 transition-colors">Report Inappropriate Content</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name} Inc. All rights reserved. Built for adults searching for real, meaningful connections.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-gray-400" /> English (US)</span>
            <Link href="/contact" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /> Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
