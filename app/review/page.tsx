'use client';

import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ThumbsUp, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { currentUser, getListings, getReviews, saveReviews } from '@/lib/mockData';
import { Listing, Review } from '@/lib/types';

export default function ReviewPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Rating form state
  const [overallRating, setOverallRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [timelinessRating, setTimelinessRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const l = getListings();
    setListings(l);
    setReviews(getReviews());
    if (l.length > 0) {
      setSelectedListing(l[0]);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing || !commentText.trim()) return;

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      listingId: selectedListing.id,
      authorId: currentUser.id,
      author: currentUser,
      rating: overallRating,
      communicationRating,
      qualityRating,
      timelinessRating,
      comment: commentText.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    saveReviews(updated);
    setCommentText('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const currentListingReviews = selectedListing
    ? reviews.filter((r) => r.listingId === selectedListing.id)
    : [];

  const avgRating = currentListingReviews.length > 0
    ? (currentListingReviews.reduce((sum, r) => sum + r.rating, 0) / currentListingReviews.length).toFixed(1)
    : selectedListing?.rating.toFixed(1) || '5.0';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Trust & Reputation
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Community Reviews & Experience</h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Every review on Lendora comes from verified bookings. Ratings reflect gear reliability, studio cleanliness, host communication, and punctuality.
          </p>
        </div>

        {/* Main Grid: Listing Picker & Review Form + Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Review Form & Listing Selector */}
          <div className="lg:col-span-6 space-y-6">

            {/* Listing Selector Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Listing to Review
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                {listings.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedListing(item)}
                    className={`text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${selectedListing?.id === item.id ? 'border-emerald-600 bg-emerald-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  >
                    <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase">{item.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Review Form */}
            {selectedListing && (
              <form onSubmit={handleSubmitReview} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">

                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    Write a Review for <span className="text-emerald-600">{selectedListing.title}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Hosted by {selectedListing.host.name} • {selectedListing.location}</p>
                </div>

                {/* Overall Star Rating */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Overall Rating</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setOverallRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-8 h-8 ${star <= overallRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-bold text-slate-700">{overallRating} of 5 Stars</span>
                  </div>
                </div>

                {/* Multi-criteria Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Communication</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setCommunicationRating(s)}>
                          <Star className={`w-4 h-4 ${s <= communicationRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Quality / Cleanliness</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setQualityRating(s)}>
                          <Star className={`w-4 h-4 ${s <= qualityRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Timeliness / Pickup</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setTimelinessRating(s)}>
                          <Star className={`w-4 h-4 ${s <= timelinessRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Your Detailed Feedback</label>
                  <textarea
                    required
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Describe the condition of the gear, studio setup, or quality of service provided..."
                    className="w-full bg-slate-100 p-4 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-transparent"
                  />
                </div>

                {isSuccess && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Your review was published successfully and verified!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-colors text-sm"
                >
                  Publish Verified Review
                </button>

              </form>
            )}

          </div>

          {/* Right Column: Existing Reviews on Selected Asset */}
          <div className="lg:col-span-6 space-y-6">

            {selectedListing && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">

                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-amber-600">
                      <span className="text-2xl font-black">{avgRating}</span>
                      <span className="text-[10px] font-bold uppercase">Rating</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{selectedListing.title}</h3>
                      <p className="text-xs text-slate-500">{currentListingReviews.length} Verified community reviews</p>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {currentListingReviews.length > 0 ? (
                    currentListingReviews.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={rev.author.avatar}
                              alt={rev.author.name}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
                            />
                            <div>
                              <span className="text-xs font-bold text-slate-900 block flex items-center gap-1">
                                {rev.author.name}
                                {rev.author.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                              </span>
                              <span className="text-[10px] text-slate-400">Rented in {rev.createdAt}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{rev.rating}.0</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-slate-400 space-y-2">
                      <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-xs font-medium">Be the first to leave a review for this asset!</p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
