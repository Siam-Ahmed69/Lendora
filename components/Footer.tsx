import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                L
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Lend<span className="text-emerald-400">ora</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier, trusted peer-to-peer marketplace for renting high-end products, professional services, and inspiring creative spaces.
            </p>
            <div className="flex items-center gap-3 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> Secure Escrow & $1M Insurance
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/explore?category=product" className="hover:text-emerald-400 transition-colors">Rent Products & Gear</Link></li>
              <li><Link href="/explore?category=service" className="hover:text-emerald-400 transition-colors">Hire Professionals & Services</Link></li>
              <li><Link href="/explore?category=space" className="hover:text-emerald-400 transition-colors">Book Creative Spaces & Studios</Link></li>
              <li><Link href="/explore" className="hover:text-emerald-400 transition-colors">All Categories</Link></li>
            </ul>
          </div>

          {/* Col 3: Hosting */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Hosting</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/host/new" className="hover:text-emerald-400 transition-colors">List Your Item or Space</Link></li>
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Host Dashboard</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Lendora Guarantee</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Community Standards</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-slate-400">Get curated gear drops and exclusive host insights delivered monthly.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 text-sm text-white placeholder-slate-500 px-3.5 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 w-full"
                required
              />
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Lendora Marketplace Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Trust & Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
