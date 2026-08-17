'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Compass, 
  Settings,
  Plus
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

interface NavbarProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    username?: string;
    avatarUrl?: string | null;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const navLinks = [
    { name: 'Discover', href: '/discover', icon: Compass },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'Activities', href: '/activities', icon: Sparkles },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Safety', href: '/safety', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Logo size={40} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {link.name}
                </Link>
              );
            })}

            {/* CMD+K Search Button */}
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                window.dispatchEvent(event);
              }}
              className="flex items-center gap-2 px-3 py-1.5 ml-2 rounded-xl text-xs font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-mono">⌘K</kbd>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Community Feed Link */}
                <Link
                  href="/feed"
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
                  title="Community Feed"
                >
                  <Sparkles className="w-5 h-5 text-gray-600" />
                </Link>

                {/* Messages Link */}
                <Link
                  href="/messages"
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
                  title="Messages"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
                </Link>

                {/* Notifications Bell */}
                <Link
                  href="/notifications"
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 px-1.5 py-0.5 text-[10px] font-bold bg-purple-600 text-white rounded-full">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>

                {/* Admin Link if Admin */}
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}

                {/* User Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-purple-400 transition-all focus:outline-none"
                  >
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-purple-200"
                    />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">@{user.username || 'user'}</p>
                      </div>
                      <Link
                        href={`/profile/${user.username || 'me'}`}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Account & Privacy
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-md shadow-purple-500/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Join for Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  <Icon className="w-5 h-5 text-purple-500" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/feed"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Community Feed
                </Link>
                <Link
                  href={`/profile/${user.username || 'me'}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  <UserIcon className="w-5 h-5 text-purple-500" />
                  My Profile
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-purple-700 bg-purple-50"
                  >
                    <LayoutDashboard className="w-5 h-5 text-purple-600" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white gradient-bg"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
