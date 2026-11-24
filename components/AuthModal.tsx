'use client';

import React, { useState } from 'react';
import { ShieldCheck, User, Mail, Phone, Lock, CheckCircle2, X, Sparkles } from 'lucide-react';
import { currentUser } from '@/lib/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'verification'>('profile');
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [userBio, setUserBio] = useState(currentUser.bio || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    currentUser.name = userName;
    currentUser.email = userEmail;
    currentUser.bio = userBio;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                {currentUser.name}
                {currentUser.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
              </h2>
              <p className="text-xs text-slate-500">{currentUser.email} • Lendora Member</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 pt-3 bg-white">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'profile' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
          >
            User Profile
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'verification' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
          >
            Trust & Verifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'security' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
          >
            Escrow & Security
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-100 p-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-slate-100 p-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bio & Experience</label>
                <textarea
                  rows={3}
                  value={userBio}
                  onChange={(e) => setUserBio(e.target.value)}
                  className="w-full bg-slate-100 p-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  {isSaved && <><CheckCircle2 className="w-4 h-4" /> Profile updated successfully</>}
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Lendora requires verified profiles to ensure safety, asset security, and reliable escrow payouts across all rentals.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Government ID Verification</span>
                      <span className="text-[10px] text-slate-400">Driver License / Passport Verified</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">Verified</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Phone & SMS Authentication</span>
                      <span className="text-[10px] text-slate-400">+1 (***) ***-4829</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">Verified</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Host Liability Protection ($1M Coverage)</span>
                      <span className="text-[10px] text-slate-400">Active protection active for all rentals</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">Active</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-900">Escrow Security Shield</h4>
                  <p className="text-xs text-emerald-800/80 leading-relaxed">
                    Rental payments are held in secure escrow until the handover is completed and verified by both parties.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex justify-between font-semibold"><span>Security Deposit Threshold:</span> <span className="font-bold text-slate-900">$300 Standard</span></div>
                <div className="flex justify-between font-semibold"><span>Payout Frequency:</span> <span className="font-bold text-slate-900">Direct Deposit (24h after pickup)</span></div>
                <div className="flex justify-between font-semibold"><span>Dispute Window:</span> <span className="font-bold text-slate-900">24 Hours post-rental return</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
