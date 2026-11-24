'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Send, MessageSquare, ShieldCheck, User, ArrowLeft, Search, CheckCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { currentUser, getMessages, saveMessages, sampleUsers, getListings } from '@/lib/mockData';
import { Message, User as UserType, Listing } from '@/lib/types';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<UserType>(sampleUsers[1]); // Marcus Vance default
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = getMessages();
    setMessages(loaded);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedContact.id,
      content: newMessage.trim(),
      createdAt: new Date().toISOString(),
      read: true
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(updated);
    setNewMessage('');

    // Simulate auto-reply from host after 1.5 seconds if talking to Marcus, Elena, or David
    setTimeout(() => {
      const autoReply: Message = {
        id: `msg_reply_${Date.now()}`,
        senderId: selectedContact.id,
        receiverId: currentUser.id,
        content: `Thanks for messaging! I'll review your request regarding the rental and confirm details shortly. Feel free to reach out if you have any questions.`,
        createdAt: new Date().toISOString(),
        read: false
      };
      setMessages((prev) => {
        const next = [...prev, autoReply];
        saveMessages(next);
        return next;
      });
    }, 1500);
  };

  // Contacts list
  const contacts = sampleUsers.filter((u) => u.id !== currentUser.id);

  // Filter messages for current selected contact
  const conversationMessages = messages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.receiverId === selectedContact.id) ||
      (m.senderId === selectedContact.id && m.receiverId === currentUser.id)
  );

  const listings = getListings();
  const contactListing = listings.find((l) => l.hostId === selectedContact.id) || listings[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Messages & Inquiries</h1>
            <p className="text-xs text-slate-500 mt-0.5">Communicate with verified hosts and renters prior to handover.</p>
          </div>
        </div>

        {/* Chat App Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] h-[calc(100vh-220px)]">

          {/* Left Contacts Sidebar */}
          <div className="md:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">

            <div className="p-4 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 pl-9 pr-3 py-2 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {contacts.map((contact) => {
                const isSelected = selectedContact.id === contact.id;
                const lastMsg = messages
                  .filter(
                    (m) =>
                      (m.senderId === currentUser.id && m.receiverId === contact.id) ||
                      (m.senderId === contact.id && m.receiverId === currentUser.id)
                  )
                  .pop();

                return (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full text-left p-4 transition-all flex items-start gap-3 ${isSelected ? 'bg-white shadow-sm border-l-4 border-emerald-600' : 'hover:bg-white/80'}`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/10"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                          {contact.name}
                          {contact.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 truncate leading-tight">
                        {lastMsg ? lastMsg.content : `Inquire about rentals with ${contact.name.split(' ')[0]}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Active Chat Window */}
          <div className="md:col-span-8 flex flex-col bg-white">

            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {selectedContact.name}
                    {selectedContact.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                  </h2>
                  <p className="text-[11px] text-emerald-600 font-medium">
                    Online • Responds {selectedContact.responseTime}
                  </p>
                </div>
              </div>

              {contactListing && (
                <Link
                  href={`/listings/${contactListing.id}`}
                  className="hidden sm:flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 transition-all text-xs"
                >
                  <img src={contactListing.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div className="text-left">
                    <span className="font-bold text-slate-800 block truncate max-w-[140px]">{contactListing.title}</span>
                    <span className="text-[10px] text-emerald-600 font-black">${contactListing.pricePerDay}/day</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
              {conversationMessages.length > 0 ? (
                conversationMessages.map((msg) => {
                  const isMine = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-xs leading-relaxed ${isMine ? 'bg-slate-900 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                        <p>{msg.content}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1 flex items-center gap-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {isMine && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">No messages yet with {selectedContact.name}</h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Ask about gear condition, pickup times, or availability for your upcoming shoot.
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${selectedContact.name.split(' ')[0]}...`}
                className="flex-1 bg-slate-100 px-4 py-3 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
