'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, ShieldCheck, Zap, ArrowRight, Camera, Building2, Wrench, RefreshCw, Star, CheckCircle2, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import { getListings } from '@/lib/mockData';
import { ListingCategory } from '@/lib/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ListingCategory>('all');
  const listings = getListings();

  const filteredListings = selectedCategory === 'all'
    ? listings
    : listings.filter(l => l.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4" /> Bangladesh&apos;s Trusted Sharing & Rental Marketplace
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Own Less. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Experience More.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Rent high-end camera packages, book creative daylight studios, hire local technical experts, or share community gear across Dhaka with secure escrow, verified NID checks, and instant bKash/Nagad booking.
            </p>

            {/* Quick Search Box */}
            <div className="bg-white p-2.5 rounded-2xl shadow-2xl max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2">
              <div className="flex items-center flex-1 px-3 py-2 bg-slate-50 rounded-xl">
                <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Rent gear, book studios, hire experts in Dhaka..."
                  className="bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/explore?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
                    }
                  }}
                />
              </div>
              <Link
                href="/explore"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shrink-0 shadow-md shadow-emerald-600/30"
              >
                Explore Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> NID Verified Hosts</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-400" /> Instant Booking</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> bKash, Nagad & Escrow</span>
            </div>
          </div>

          {/* Hero Right Visual Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">Featured in Banani, Dhaka</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full">Top Pick</span>
              </div>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative">
                <img
                  src={listings[0]?.images[0]}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{listings[0]?.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {listings[0]?.location}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                <div>
                  <span className="text-xl font-black text-white">৳{listings[0]?.pricePerDay?.toLocaleString()}</span>
                  <span className="text-xs text-slate-400"> / day</span>
                </div>
                <Link
                  href={`/listings/${listings[0]?.id}`}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  Book Rental
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Category Pills & Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Explore the Marketplace</h2>
            <p className="text-sm text-slate-500 mt-1">Discover top-rated products, professional services, creative spaces, and item sharing.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl self-start overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All Items
            </button>
            <button
              onClick={() => setSelectedCategory('product')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${selectedCategory === 'product' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" /> Products & Gear
            </button>
            <button
              onClick={() => setSelectedCategory('service')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${selectedCategory === 'service' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Wrench className="w-3.5 h-3.5 text-emerald-600" /> Services & Tutors
            </button>
            <button
              onClick={() => setSelectedCategory('space')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${selectedCategory === 'space' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Studios & Spaces
            </button>
            <button
              onClick={() => setSelectedCategory('sharing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${selectedCategory === 'sharing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" /> Sharing & Exchange
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm transition-colors shadow-lg"
          >
            Browse All Dhaka Listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-100 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-600">Local & Reliable</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">How Lendora Works in Bangladesh</h2>
            <p className="text-sm text-slate-600">Renting, hiring, or sharing has never been safer or more accessible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 font-bold text-xl flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-lg text-slate-900">Browse & Select</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Find cinema cameras, laptops, daylight lofts, or verified tutors in Gulshan, Banani, Dhanmondi, and Uttara with transparent daily BDT pricing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 font-bold text-xl flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-lg text-slate-900">bKash, Nagad or Card Escrow</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Book instantly with mobile financial services or card. Your payment is held securely in escrow until both parties confirm handover.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 font-bold text-xl flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-lg text-slate-900">Pickup, Create & Return</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Meet your host, verify gear condition, complete your production or study project, and return smoothly with community ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> Lendora Trust & Safety
            </div>
            <h2 className="text-3xl font-black tracking-tight">Protected from handover to return.</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every rental on Lendora is backed by our ৳10,00,000 host liability coverage, 24/7 emergency support, and mandatory Bangladesh National ID (NID) verification.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4">
            <Link
              href="/host/new"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors text-center shadow-lg shadow-emerald-600/30"
            >
              List an Asset or Space
            </Link>
            <Link
              href="/explore"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors text-center border border-white/20"
            >
              Explore All Listings
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
