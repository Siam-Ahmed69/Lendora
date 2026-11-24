'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, MapPin, ShieldCheck, Zap, Calendar, Check, MessageSquare, ArrowLeft, Heart, User as UserIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getListings, getReviews } from '@/lib/mockData';
import { Listing, Review } from '@/lib/types';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [startDate, setStartDate] = useState('2026-11-10');
  const [endDate, setEndDate] = useState('2026-11-13');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const allListings = getListings();
    const found = allListings.find((l) => l.id === id);
    if (found) {
      setListing(found);
    }
    const allReviews = getReviews();
    setReviews(allReviews.filter((r) => r.listingId === id));
  }, [id]);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Listing not found</h2>
            <p className="text-slate-500 text-sm">The item you are looking for may have been removed or does not exist.</p>
            <button
              onClick={() => router.push('/explore')}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate total days
  const startObj = new Date(startDate);
  const endObj = new Date(endDate);
  const diffTime = Math.abs(endObj.getTime() - startObj.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const rentalTotal = diffDays * listing.pricePerDay;
  const serviceFee = Math.round(rentalTotal * 0.08);
  const grandTotal = rentalTotal + serviceFee + listing.securityDeposit;

  const handleProceedToCheckout = () => {
    router.push(`/checkout/${listing.id}?start=${startDate}&end=${endDate}&total=৳{grandTotal.toLocaleString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        
        {/* Back Button & Title Header */}
        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to results
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {listing.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {listing.category}
              </span>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:text-rose-500 transition-colors shadow-sm"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {listing.location}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating.toFixed(2)}</span>
              <span className="text-slate-400">({listing.reviewCount} reviews)</span>
            </div>
            <span>•</span>
            <span className="text-emerald-600 font-bold">{listing.subCategory}</span>
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] sm:h-[480px] rounded-3xl overflow-hidden">
          <div className="md:col-span-2 h-full bg-slate-200">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="h-1/2 bg-slate-200">
              <img
                src={listing.images[1] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-1/2 bg-slate-200">
              <img
                src={listing.images[2] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Content & Booking Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Host Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    Hosted by {listing.host.name}
                    {listing.host.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                  </h3>
                  <p className="text-xs text-slate-500">Member since {listing.host.joinedDate} • ★ {listing.host.rating} host rating</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/messages')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Message Host
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">About this {listing.category}</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Features & Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Rental Guidelines & Rules</h2>
              <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                {listing.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Booking Sidebar Widget */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl space-y-6">
              
              <div className="flex items-baseline justify-between pb-6 border-b border-slate-100">
                <div>
                  <span className="text-3xl font-black text-slate-900">৳{listing.pricePerDay.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 font-medium"> / day</span>
                </div>
                {listing.instantBook && (
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-emerald-600" /> Instant Book
                  </span>
                )}
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-100 p-3 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-100 p-3 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-3 pt-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>৳{listing.pricePerDay.toLocaleString()} × {diffDays} {diffDays === 1 ? 'day' : 'days'}</span>
                  <span className="font-semibold text-slate-900">৳{rentalTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit (Refundable)</span>
                  <span className="font-semibold text-slate-900">৳{listing.securityDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lendora Protection & Service Fee (8%)</span>
                  <span className="font-semibold text-slate-900">৳{serviceFee.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-colors text-sm"
              >
                Proceed to Secure Checkout
              </button>

              <p className="text-center text-[11px] text-slate-400">
                You won&apos;t be charged yet until you confirm details on the checkout page.
              </p>

            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
