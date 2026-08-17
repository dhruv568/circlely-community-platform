'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Users, Sparkles, MessageSquare, User } from 'lucide-react';

interface MobileBottomNavProps {
  user?: {
    username?: string;
  } | null;
}

export function MobileBottomNav({ user }: MobileBottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Discover', href: '/discover', icon: Compass },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'Activities', href: '/activities', icon: Sparkles },
    { name: 'Messages', href: user ? '/messages' : '/login', icon: MessageSquare },
    { name: 'Profile', href: user ? `/profile/${user.username || 'me'}` : '/login', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-purple-600 font-bold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600 scale-110' : 'text-gray-400'}`} />
              <span className="text-[10px] mt-0.5 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
