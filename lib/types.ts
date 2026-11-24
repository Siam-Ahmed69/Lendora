export type ListingCategory = 'product' | 'service' | 'space' | 'sharing';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  role: 'renter' | 'host' | 'both';
  rating: number;
  reviewCount: number;
  joinedDate: string;
  verified: boolean;
  phoneVerified?: boolean;
  idVerified?: boolean; // NID / Passport verified in Bangladesh
  nidVerified?: boolean;
  bio?: string;
  location?: string;
  responseRate?: number;
  responseTime?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: ListingCategory;
  subCategory: string;
  pricePerDay: number;
  pricePerHour?: number;
  securityDeposit: number;
  location: string; // e.g. "Dhanmondi, Dhaka", "Gulshan-2, Dhaka", "Banani, Dhaka"
  images: string[];
  hostId: string;
  host: User;
  rating: number;
  reviewCount: number;
  features: string[];
  rules: string[];
  instantBook: boolean;
  status: 'active' | 'inactive';
  createdAt: string;
  // Sharing specific options
  sharingType?: 'rent' | 'exchange' | 'borrow';
  exchangePreferences?: string; // what the owner wants in exchange
  deliveryAvailable?: boolean;
  division?: string;
}

export interface Booking {
  id: string;
  listingId: string;
  listing: Listing;
  renterId: string;
  renter: User;
  startDate: string;
  endDate: string;
  totalPrice: number;
  securityDeposit: number;
  protectionPlan?: 'basic' | 'premium';
  handoverOption?: 'pickup' | 'delivery';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethod: string; // bKash, Nagad, Card, Escrow
}

export interface Review {
  id: string;
  listingId: string;
  authorId: string;
  author: User;
  rating: number;
  communicationRating?: number;
  qualityRating?: number;
  timelinessRating?: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  listing?: Listing;
  lastMessage: Message;
  unreadCount: number;
}
