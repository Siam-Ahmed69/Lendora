'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Zap, MapPin, Star, Camera, Building2, Wrench, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import { getListings } from '@/lib/mockData';
import { Listing } from '@/lib/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [instantBookOnly, setInstantBookOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(25000); // BDT max price
  const [listings, setListings] = useState<Listing[]>(() => getListings());

  useEffect(() => {
    setListings(getListings());
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesQuery =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;
    const matchesInstant = !instantBookOnly || listing.instantBook;
    const matchesPrice = listing.pricePerDay <= maxPrice;

    return matchesQuery && matchesCategory && matchesInstant && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">

      {/* Header & Search Filter Bar */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Marketplace Explorer</h1>
            <p className="text-sm text-slate-500 mt-1">Discover and filter products, creative services, studios, and sharing items in Dhaka.</p>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, gear, studio, location..."
              className="w-full bg-slate-100 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white border border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['all', 'product', 'service', 'space', 'sharing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${categoryFilter === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Instant Book Toggle & Price Filter */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={instantBookOnly}
                onChange={(e) => setInstantBookOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> Instant Book Only</span>
            </label>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span>Max: ৳{maxPrice.toLocaleString()}/day</span>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Showing {filteredListings.length} available listings</span>
        <span>Sorted by relevance</span>
      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-900">No matching listings found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">Try adjusting your search query, price range, or category filters to find what you are looking for.</p>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setInstantBookOnly(false); setMaxPrice(25000); }}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading marketplace explorer...</div>}>
        <ExploreContent />
      </Suspense>
      <Footer />
    </div>
  );
}
