'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Zap, Heart, RefreshCw } from 'lucide-react';
import { Listing } from '@/lib/types';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col">

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Link href={`/listings/${listing.id}`}>
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm uppercase tracking-wider flex items-center gap-1">
          {listing.category === 'sharing' && <RefreshCw className="w-3 h-3 text-emerald-600" />}
          {listing.category}
        </div>

        {/* Instant Book Badge */}
        {listing.instantBook && (
          <div className="absolute top-3 left-24 bg-emerald-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
            <Zap className="w-3 h-3 fill-white" /> Instant
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-sm"
          title="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 truncate max-w-[190px]">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {listing.location}
            </span>
            <div className="flex items-center gap-1 font-bold text-slate-800 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating.toFixed(2)}</span>
              <span className="text-slate-400 font-normal">({listing.reviewCount})</span>
            </div>
          </div>

          <Link href={`/listings/${listing.id}`}>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 text-base">
              {listing.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {listing.exchangePreferences && (
            <div className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">Exchange: {listing.exchangePreferences}</span>
            </div>
          )}
        </div>

        {/* Footer Pricing & CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-slate-900">৳{listing.pricePerDay.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-medium"> / day</span>
          </div>
          <Link
            href={`/listings/${listing.id}`}
            className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
}
