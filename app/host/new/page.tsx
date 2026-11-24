'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, ArrowLeft, ShieldCheck, Camera, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getListings, saveListings, currentUser } from '@/lib/mockData';
import { Listing, ListingCategory } from '@/lib/types';

export default function NewListingPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ListingCategory>('product');
  const [subCategory, setSubCategory] = useState('Cameras & Optics');
  const [pricePerDay, setPricePerDay] = useState(75);
  const [securityDeposit, setSecurityDeposit] = useState(200);
  const [location, setLocation] = useState('New York, NY');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&auto=format&fit=crop&q=80');
  const [instantBook, setInstantBook] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newListing: Listing = {
      id: `lst_${Date.now()}`,
      title,
      description,
      category,
      subCategory,
      pricePerDay: Number(pricePerDay),
      securityDeposit: Number(securityDeposit),
      location,
      images: [imageUrl, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1000&auto=format&fit=crop&q=80'],
      hostId: currentUser.id,
      host: currentUser,
      rating: 5.0,
      reviewCount: 0,
      features: ['Verified Listing', 'Instant Bookable', 'Secure Handover'],
      rules: ['Standard rental agreement applies', 'Valid ID required upon pickup'],
      instantBook,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const existing = getListings();
    saveListings([newListing, ...existing]);

    alert('Listing created successfully!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Host Wizard
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">List a New Item, Service, or Space</h1>
          <p className="text-sm text-slate-500">Fill in the details below to publish your listing instantly to the Lendora marketplace.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Listing Category</label>
            <div className="grid grid-cols-3 gap-3">
              {(['product', 'service', 'space'] as ListingCategory[]).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all ${category === cat ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sony FX3 Cinema Camera Kit with 24-70mm Lens"
              className="w-full bg-slate-100 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Sub-Category</label>
              <input
                type="text"
                required
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Cameras & Optics"
                className="w-full bg-slate-100 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Williamsburg, Brooklyn, NY"
                className="w-full bg-slate-100 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Price Per Day ($)</label>
              <input
                type="number"
                required
                min="1"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(Number(e.target.value))}
                className="w-full bg-slate-100 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Security Deposit ($)</label>
              <input
                type="number"
                required
                min="0"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                className="w-full bg-slate-100 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-100 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item, features, condition, and what's included..."
              className="w-full bg-slate-100 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
            ></textarea>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="instant"
              checked={instantBook}
              onChange={(e) => setInstantBook(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="instant" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
              Enable Instant Booking (Allow renters to book immediately without manual approval)
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-colors text-sm"
          >
            Publish Listing
          </button>

        </form>

      </div>

      <Footer />
    </div>
  );
}
