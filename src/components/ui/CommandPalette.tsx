'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Users, Compass, Sparkles, Calendar, ArrowRight } from 'lucide-react';

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener: CMD+K or CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Young Professionals Circle', type: 'Community', href: '/communities/young-professionals-circle', icon: Users },
    { title: 'Gaming Community', type: 'Community', href: '/communities/gaming-community', icon: Users },
    { title: 'Acoustic Jam Session', type: 'Activity', href: '/activities', icon: Sparkles },
    { title: 'Sunset Photowalk', type: 'Event', href: '/events', icon: Calendar },
    { title: 'Discover Members', type: 'People', href: '/discover', icon: Compass },
  ];

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search communities, people, events... (Esc to close)"
            className="w-full text-sm bg-transparent border-none text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-400"
            autoFocus
          />
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Results */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-1">
            Quick Navigation & Suggestions
          </p>
          {quickLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(item.href)}
                className="w-full p-3 rounded-2xl flex items-center justify-between text-left hover:bg-indigo-50/70 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-indigo-600">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-indigo-500 font-semibold">{item.type}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            );
          })}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-400 px-4">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-700 border text-[10px] font-mono">Esc</kbd> to exit</span>
          <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-700 border text-[10px] font-mono">⌘K</kbd></span>
        </div>

      </div>
    </div>
  );
}
