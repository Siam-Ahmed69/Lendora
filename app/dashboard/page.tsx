'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Package, PlusCircle, DollarSign, Star, ShieldCheck, User as UserIcon, CheckCircle2, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { currentUser, getBookings, getListings } from '@/lib/mockData';
import { Booking, Listing } from '@/lib/types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'rentals' | 'listings' | 'earnings'>('rentals');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    setBookings(getBookings());
    setListings(getListings());
  }, []);

  const myListings = listings.filter((l) => l.hostId === currentUser.id || l.hostId === 'usr_2'); // Show some sample listings for demo

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md"
            />
            <div className="space-y-1 text-center md:text-left">
              <h1 className="text-2xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
                {currentUser.name}
                {currentUser.verified && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
              </h1>
              <p className="text-xs text-slate-500">{currentUser.email} • Joined {currentUser.joinedDate}</p>
              <div className="flex items-center justify-center md:justify-start gap-3 pt-1 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {currentUser.rating} ({currentUser.reviewCount} reviews)</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold uppercase tracking-wider">Host & Renter</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/host/new"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Create New Listing
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
          <button
            onClick={() => setActiveTab('rentals')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'rentals' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            <Calendar className="w-4 h-4" /> My Bookings & Rentals ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'listings' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            <Package className="w-4 h-4" /> My Active Listings ({myListings.length})
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'earnings' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            <DollarSign className="w-4 h-4" /> Earnings & Payouts
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Your Booked Items & Spaces</h2>
            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.listing?.images[0]}
                        alt={booking.listing?.title}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          {booking.status}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{booking.listing?.title}</h3>
                        <p className="text-xs text-slate-500">{booking.listing?.location}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 text-xs font-medium text-slate-700 space-y-2 border border-slate-100">
                      <div className="flex justify-between"><span>Rental Dates:</span> <span className="font-bold">{booking.startDate} to {booking.endDate}</span></div>
                      <div className="flex justify-between"><span>Total Paid:</span> <span className="font-bold text-emerald-600">৳{booking.totalPrice.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span>Payment Method:</span> <span className="font-bold">{booking.paymentMethod}</span></div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={`/messages`}
                        className="text-xs font-bold text-emerald-600 hover:underline"
                      >
                        Contact Host
                      </Link>
                      <Link
                        href={`/listings/${booking.listingId}`}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                      >
                        View Listing
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <p className="text-sm text-slate-500">You have no active bookings yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Your Listed Items, Services & Spaces</h2>
              <Link href="/host/new" className="text-xs font-bold text-emerald-600 hover:underline">+ Add New Listing</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="aspect-[16/10] bg-slate-100 relative">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {listing.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{listing.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="font-black text-slate-900">৳{listing.pricePerDay.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ day</span></span>
                      <Link href={`/listings/${listing.id}`} className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-emerald-600">Manage</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Earnings Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
                <p className="text-3xl font-black text-slate-900">৳48,500.00</p>
                <span className="text-xs text-emerald-600 font-semibold">+18% vs last month</span>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Payout</span>
                <p className="text-3xl font-black text-slate-900">৳14,200.00</p>
                <span className="text-xs text-slate-500 font-semibold">Available on Monday</span>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Rentals</span>
                <p className="text-3xl font-black text-slate-900">34</p>
                <span className="text-xs text-emerald-600 font-semibold">★ 4.96 average rating</span>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
