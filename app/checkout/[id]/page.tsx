'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getListings, getBookings, saveBookings, currentUser } from '@/lib/mockData';
import { Listing, Booking } from '@/lib/types';

function CheckoutContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params?.id as string;

  const startDate = searchParams.get('start') || '2026-11-10';
  const endDate = searchParams.get('end') || '2026-11-13';

  const [listing, setListing] = useState<Listing | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('bKash Merchant (+880 1712-345678)');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const all = getListings();
    const found = all.find((l) => l.id === id);
    if (found) setListing(found);
  }, [id]);

  if (!listing) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-700">Loading Checkout Details...</h2>
      </div>
    );
  }

  const startObj = new Date(startDate);
  const endObj = new Date(endDate);
  const diffDays = Math.max(1, Math.ceil(Math.abs(endObj.getTime() - startObj.getTime()) / (1000 * 60 * 60 * 24)));
  const rentalTotal = diffDays * listing.pricePerDay;
  const serviceFee = Math.round(rentalTotal * 0.08);
  const grandTotal = rentalTotal + serviceFee + listing.securityDeposit;

  const handleConfirmBooking = () => {
    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      listingId: listing.id,
      listing,
      renterId: currentUser.id,
      renter: currentUser,
      startDate,
      endDate,
      totalPrice: grandTotal,
      securityDeposit: listing.securityDeposit,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      paymentMethod
    };

    const existingBookings = getBookings();
    saveBookings([newBooking, ...existingBookings]);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 flex-1 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl text-center space-y-6 w-full">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900">Booking Confirmed!</h1>
            <p className="text-sm text-slate-500">
              Your rental for <span className="font-semibold text-slate-800">{listing.title}</span> has been securely processed and confirmed with the host via escrow.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2 text-xs font-medium text-slate-700 border border-slate-100">
            <div className="flex justify-between"><span>Rental Dates:</span> <span className="font-bold">{startDate} to {endDate}</span></div>
            <div className="flex justify-between"><span>Total Paid:</span> <span className="font-bold text-emerald-600">৳{grandTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Payment Method:</span> <span className="font-bold">{paymentMethod}</span></div>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors"
            >
              View in Dashboard
            </button>
            <button
              onClick={() => router.push('/messages')}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors"
            >
              Message Host
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to listing
      </button>

      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Confirm & Pay (Bangladesh Secure Escrow)</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

        {/* Left Form */}
        <div className="md:col-span-7 space-y-6">

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Your Rental Schedule</h2>
            <div className="flex items-center justify-between text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Dates</span>
                <span className="font-semibold">{startDate} — {endDate} ({diffDays} {diffDays === 1 ? 'day' : 'days'})</span>
              </div>
              <button onClick={() => router.back()} className="text-xs text-emerald-600 font-bold hover:underline">Edit</button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" /> Select Payment Method (bKash, Nagad & Cards)
            </h2>
            <div className="space-y-3">
              {[
                'bKash Merchant (+880 1712-345678)',
                'Nagad Pay (+880 1819-876543)',
                'Rocket Mobile Banking',
                'Visa / Mastercard / AMEX (Bangladesh Issued)',
                'Cash on Handover / Escrow Hold'
              ].map((method) => (
                <label key={method} className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === method ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-semibold text-slate-800">{method}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Verified</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Cancellation & Security Policy</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Free cancellation up to 48 hours before the rental start date. Security deposits are fully refunded upon safe return verified by the host in Dhaka.
            </p>
          </div>

        </div>

        {/* Right Summary Card */}
        <div className="md:col-span-5 sticky top-28">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{listing.title}</h3>
                <p className="text-xs text-slate-500">{listing.location}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Rental ({diffDays}d × ৳{listing.pricePerDay.toLocaleString()})</span>
                <span className="font-semibold text-slate-900">৳{rentalTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Security Deposit (Refundable)</span>
                <span className="font-semibold text-slate-900">৳{listing.securityDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Service & Insurance Fee</span>
                <span className="font-semibold text-slate-900">৳{serviceFee.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
                <span>Total Due Now</span>
                <span className="text-emerald-600">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Confirm & Pay ৳{grandTotal.toLocaleString()}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Escrow Protected & NID Verified
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading checkout...</div>}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}
