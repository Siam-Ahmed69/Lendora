'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, PlusCircle, MessageSquare, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { currentUser, getMessages } from '@/lib/mockData';
import AuthModal from './AuthModal';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  useEffect(() => {
    const msgs = getMessages();
    const unread = msgs.filter((m) => m.receiverId === currentUser.id && !m.read).length;
    setUnreadCount(unread > 0 ? unread : 1);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/explore?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                Lend<span className="text-emerald-600">ora</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-0.5">
                Marketplace
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md bg-slate-100 hover:bg-slate-200/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-500 border border-transparent rounded-full px-4 py-2.5 transition-all shadow-sm">
            <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear, spaces, or creative services..."
              className="bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full"
            />
          </form>

          {/* Right Navigation Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/explore"
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${pathname === '/explore' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Explore
            </Link>

            <Link
              href="/review"
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${pathname === '/review' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Reviews
            </Link>

            <Link
              href="/host/new"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border border-slate-200"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>List an Asset</span>
            </Link>

            <Link
              href="/messages"
              className="relative p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              )}
            </Link>

            {/* Profile Dropdown / Modal Trigger */}
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all ${pathname === '/dashboard' ? 'border-emerald-600 bg-emerald-50/50 shadow-sm' : 'border-slate-200 hover:shadow-md bg-white'}`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                    {currentUser.name.split(' ')[0]}
                    {currentUser.verified && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">Dashboard</span>
                </div>
              </Link>

              <button
                onClick={() => setAuthModalOpen(true)}
                title="Account Settings & Trust Profile"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/messages"
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-slate-100 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Lendora..."
                className="bg-transparent text-sm focus:outline-none w-full"
              />
            </form>
            <div className="flex flex-col space-y-2 pt-2 text-sm font-semibold text-slate-700">
              <Link
                href="/explore"
                className="px-3 py-2 rounded-lg hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Marketplace
              </Link>
              <Link
                href="/review"
                className="px-3 py-2 rounded-lg hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community Reviews
              </Link>
              <Link
                href="/host/new"
                className="px-3 py-2 rounded-lg text-emerald-600 bg-emerald-50 flex items-center gap-2 font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PlusCircle className="w-4 h-4" /> List an Item or Space
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Dashboard & Rentals</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Active</span>
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" /> Trust & Verification
              </button>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
