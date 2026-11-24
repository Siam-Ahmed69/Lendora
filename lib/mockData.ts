import { User, Listing, Booking, Review, Message } from './types';

export const currentUser: User = {
  id: 'usr_1',
  name: 'Raisul Islam',
  email: 'raisul.islam@example.com',
  phone: '+880 1712-345678',
  avatar: 'https://gravatar.com/avatar/780377aad6c69a1bbbeb8937018f106f?s=400&d=robohash&r=x',
  role: 'both',
  rating: 4.94,
  reviewCount: 42,
  joinedDate: 'January 2023',
  verified: true,
  phoneVerified: true,
  idVerified: true,
  nidVerified: true,
  bio: 'Software architect & independent filmmaker based in Dhaka. Passionate about gear sharing, community tech workspaces, and sustainable collaborative economy.',
  location: 'Gulshan-2, Dhaka',
  responseRate: 99,
  responseTime: 'within 15 minutes'
};

export const sampleUsers: User[] = [
  currentUser,
  {
    id: 'usr_2',
    name: 'Md. Labib Kabir',
    email: 'labib.k@example.com',
    phone: '+880 1819-876543',
    avatar: 'https://gravatar.com/avatar/66be080db85d3f08b37797a6cd0a9b6b?s=400&d=robohash&r=x',
    role: 'host',
    rating: 4.98,
    reviewCount: 135,
    joinedDate: 'November 2021',
    verified: true,
    phoneVerified: true,
    idVerified: true,
    nidVerified: true,
    bio: 'Professional cinematographer and studio owner managing high-end camera packages in Banani.',
    location: 'Banani, Dhaka',
    responseRate: 100,
    responseTime: 'within 10 minutes'
  },
  {
    id: 'usr_3',
    name: 'Ahnaf Ferdous',
    email: 'ahnaf.f@example.com',
    phone: '+880 1911-223344',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Deerin&backgroundColor=d4f1c5&radius=50',
    role: 'host',
    rating: 4.89,
    reviewCount: 74,
    joinedDate: 'March 2023',
    verified: true,
    phoneVerified: true,
    idVerified: true,
    nidVerified: true,
    bio: 'Architect and creative space director curating daylight photo studios and event spaces in Dhanmondi.',
    location: 'Dhanmondi, Dhaka',
    responseRate: 96,
    responseTime: 'within 30 minutes'
  },
  {
    id: 'usr_4',
    name: 'Sayma Sultana Rupoma',
    email: 'sayma.r@example.com',
    phone: '+880 1552-998877',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahnaf&backgroundColor=ffd5dc&radius=50',
    role: 'host',
    rating: 4.92,
    reviewCount: 58,
    joinedDate: 'August 2022',
    verified: true,
    phoneVerified: true,
    idVerified: true,
    nidVerified: true,
    bio: 'Full-stack tech mentor, robotics hobbyist, and academic equipment lender in Uttara.',
    location: 'Uttara, Dhaka',
    responseRate: 98,
    responseTime: 'within an hour'
  },
  {
    id: 'usr_5',
    name: 'Meherun Muntaha Deerin',
    email: 'meherun.d@example.com',
    phone: '+880 1611-001122',
    avatar: 'https://gravatar.com/avatar/31cad89bc1bac3c6b8ddfaf4f189835d?s=400&d=monsterid&r=x',
    role: 'host',
    rating: 4.95,
    reviewCount: 45,
    joinedDate: 'February 2024',
    verified: true,
    phoneVerified: true,
    idVerified: true,
    nidVerified: true,
    bio: 'Event coordinator and technical specialist focused on reliable equipment solutions.',
    location: 'Mirpur, Dhaka',
    responseRate: 97,
    responseTime: 'within 20 minutes'
  }
];

export const initialListings: Listing[] = [
  {
    id: 'lst_1',
    title: 'Sony Alpha a7IV Mirrorless Cinema Kit + 24-70mm f/2.8 GM II',
    description: 'Professional 4K 60p full-frame mirrorless camera package. Comes with rugged Pelican case, 3 high-capacity batteries, dual slot charger, 128GB V90 SD cards, and Sony FE 24-70mm f/2.8 GM II lens. Ideal for commercial music videos, weddings, and documentary shoots across Dhaka.',
    category: 'product',
    subCategory: 'Cameras & Optics',
    pricePerDay: 4500, // BDT
    pricePerHour: 800,
    securityDeposit: 15000,
    location: 'Banani, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_2',
    host: sampleUsers[1],
    rating: 4.96,
    reviewCount: 45,
    features: ['4K 60fps Recording', 'In-Body Stabilization', 'Weather Sealed Body', 'Includes Variable ND Filters', 'Extra Battery Grip Included'],
    rules: ['Valid NID card required during handover', 'Must be returned clean and fully charged', 'No outdoor rainy shoot without rain cover'],
    instantBook: true,
    status: 'active',
    createdAt: '2024-01-15',
    division: 'Dhaka'
  },
  {
    id: 'lst_2',
    title: 'The Daylight Loft & Creative Production Studio',
    description: 'A stunning 1,800 sq ft industrial daylight loft with 14-ft exposed brick walls, north-facing arched windows, polished concrete floors, and curated furniture sets. Perfect for photo shoots, brand lookbooks, casting calls, and intimate workshops in Dhanmondi.',
    category: 'space',
    subCategory: 'Photo & Video Studios',
    pricePerDay: 12000, // BDT
    pricePerHour: 2000,
    securityDeposit: 5000,
    location: 'Dhanmondi, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_3',
    host: sampleUsers[2],
    rating: 4.99,
    reviewCount: 88,
    features: ['14-ft High Ceilings', 'High-Speed Wi-Fi (100Mbps)', 'Makeup & Dressing Station', 'Garment Racks & Steamers', 'Air Conditioned Studio'],
    rules: ['Max capacity 25 people', 'No smoking or open flames inside', 'Shoes off on white seamless background paper'],
    instantBook: true,
    status: 'active',
    createdAt: '2023-11-20',
    division: 'Dhaka'
  },
  {
    id: 'lst_3',
    title: 'Professional Cinematic Drone Pilot & 4K Aerial Videography',
    description: 'Hire an expert drone pilot with DJI Mavic 3 Pro Cine system. Includes RAW Apple ProRes recording, dual operator setup for cinematic panning, and complete site clearance handling across Bangladesh.',
    category: 'service',
    subCategory: 'Media Production Services',
    pricePerDay: 8000,
    pricePerHour: 1500,
    securityDeposit: 2000,
    location: 'Gulshan-2, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_4',
    host: sampleUsers[3],
    rating: 4.91,
    reviewCount: 29,
    features: ['Experienced Pilot', 'Same-Day Footage Offload', '4K 120fps & 10-bit D-Log', 'Weather Backup Date Included'],
    rules: ['Subject to CAAB airspace regulations and weather conditions'],
    instantBook: false,
    status: 'active',
    createdAt: '2024-02-10',
    division: 'Dhaka'
  },
  {
    id: 'lst_4',
    title: 'MacBook Pro 16 M3 Max (64GB RAM, 2TB SSD)',
    description: 'Ultimate powerhouse laptop for video editing, 3D rendering, and heavy software development workloads. Pre-loaded with Final Cut Pro, DaVinci Resolve Studio, and Adobe Creative Cloud upon request.',
    category: 'product',
    subCategory: 'Laptops & Electronics',
    pricePerDay: 2500,
    pricePerHour: 400,
    securityDeposit: 10000,
    location: 'Uttara, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_4',
    host: sampleUsers[3],
    rating: 4.94,
    reviewCount: 37,
    features: ['M3 Max Chip (16-core CPU)', '64GB Unified Memory', 'Retina XDR ProMotion Display', 'MagSafe 3 Fast Charger Included'],
    rules: ['No installing unauthorized pirated software', 'Verified NID copy required'],
    instantBook: true,
    status: 'active',
    createdAt: '2024-02-18',
    division: 'Dhaka'
  },
  {
    id: 'lst_5',
    title: 'Acoustic Podcast & Voiceover Recording Booth',
    description: 'Fully soundproofed studio in Bashundhara R/A equipped with Shure SM7B mics, Rodecaster Pro II mixer, multi-cam 4K Sony FX3 video setup, and dedicated recording engineer.',
    category: 'space',
    subCategory: 'Audio & Podcast Studios',
    pricePerDay: 8000,
    pricePerHour: 1200,
    securityDeposit: 3000,
    location: 'Bashundhara R/A, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_3',
    host: sampleUsers[2],
    rating: 4.97,
    reviewCount: 54,
    features: ['Acoustic Treatment NRC 0.95', 'Shure SM7B Mics (x4)', 'Isolated Control Room', 'Multi-cam ISO recording'],
    rules: ['No food or beverages near sound mixing console'],
    instantBook: true,
    status: 'active',
    createdAt: '2023-12-05',
    division: 'Dhaka'
  },
  {
    id: 'lst_6',
    title: 'UI/UX Design & Full-Stack App Development Sprint',
    description: 'Hire a senior product engineer and designer for a 1-week rapid prototyping sprint. Deliverables include Figma design system, React/Next.js frontend, and production-ready architecture.',
    category: 'service',
    subCategory: 'Designers & Developers',
    pricePerDay: 15000,
    pricePerHour: 2500,
    securityDeposit: 5000,
    location: 'Gulshan-1, Dhaka (Remote available)',
    images: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_1',
    host: currentUser,
    rating: 5.0,
    reviewCount: 22,
    features: ['Figma Master Files', 'Clean TypeScript Codebase', 'Daily Progress Sync Calls', 'Post-launch Support'],
    rules: ['Requires detailed project brief upon booking'],
    instantBook: false,
    status: 'active',
    createdAt: '2024-03-10',
    division: 'Dhaka'
  },
  {
    id: 'lst_7',
    title: 'Advanced Calculus & Data Science Academic Tutor',
    description: 'Expert academic tutoring for university students in Linear Algebra, Multivariable Calculus, Python Machine Learning, and Algorithms. Conducted in quiet meeting rooms in Dhanmondi or online via Zoom.',
    category: 'service',
    subCategory: 'Tutors & Academic Assistance',
    pricePerDay: 3000,
    pricePerHour: 800,
    securityDeposit: 500,
    location: 'Dhanmondi, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_4',
    host: sampleUsers[3],
    rating: 4.98,
    reviewCount: 64,
    features: ['BUET / DU Alumni Instructor', 'Custom Practice Problem Sets', 'Exam Preparation Sessions'],
    rules: ['Advance booking required at least 24 hours prior'],
    instantBook: true,
    status: 'active',
    createdAt: '2023-09-15',
    division: 'Dhaka'
  },
  {
    id: 'lst_8',
    title: 'Trek Dual Sport Hybrid Bicycle (Fully Serviced)',
    description: 'High-performance hybrid bicycle ideal for city commuting across Gulshan, Banani, and Hatirjheel. Comes with helmet, Kryptonite lock, phone mount, and built-in puncture resistance tires.',
    category: 'sharing',
    subCategory: 'Bicycles & Eligible Vehicles',
    pricePerDay: 600,
    pricePerHour: 100,
    securityDeposit: 3000,
    location: 'Gulshan-2, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1000&auto=format&fit=crop&q=80'
    ],
    hostId: 'usr_1',
    host: currentUser,
    rating: 4.92,
    reviewCount: 31,
    features: ['Kryptonite U-Lock Included', 'Adjustable Gel Saddle', 'Water Bottle Holder', 'Front & Rear Safety Lights'],
    rules: ['Must be locked securely when parked', 'Return with clean frame'],
    instantBook: true,
    status: 'active',
    createdAt: '2024-03-05',
    sharingType: 'borrow',
    exchangePreferences: 'Willing to exchange for camping gear or guitar for weekend',
    division: 'Dhaka'
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'bk_1',
    listingId: 'lst_1',
    listing: initialListings[0],
    renterId: 'usr_1',
    renter: currentUser,
    startDate: '2026-11-05',
    endDate: '2026-11-08',
    totalPrice: 14580, // 4500 * 3 + service fee + deposit info
    securityDeposit: 15000,
    protectionPlan: 'premium',
    handoverOption: 'pickup',
    status: 'confirmed',
    createdAt: '2026-10-10',
    paymentMethod: 'bKash Merchant (+880 17...)'
  },
  {
    id: 'bk_2',
    listingId: 'lst_2',
    listing: initialListings[1],
    renterId: 'usr_1',
    renter: currentUser,
    startDate: '2026-12-01',
    endDate: '2026-12-01',
    totalPrice: 12000,
    securityDeposit: 5000,
    protectionPlan: 'basic',
    handoverOption: 'pickup',
    status: 'pending',
    createdAt: '2026-10-18',
    paymentMethod: 'Nagad Pay'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev_1',
    listingId: 'lst_1',
    authorId: 'usr_3',
    author: sampleUsers[2],
    rating: 5,
    communicationRating: 5,
    qualityRating: 5,
    timelinessRating: 5,
    comment: 'The Sony a7IV kit was in immaculate condition. Labib was extremely helpful with pickup instructions in Banani and included an extra battery. Highly recommended!',
    createdAt: '2026-09-12'
  },
  {
    id: 'rev_2',
    listingId: 'lst_2',
    authorId: 'usr_1',
    author: currentUser,
    rating: 5,
    communicationRating: 5,
    qualityRating: 5,
    timelinessRating: 5,
    comment: 'Absolute dream daylight studio in Dhanmondi for our fashion shoot. Ahnaf was a wonderful host and the natural light is stunning.',
    createdAt: '2026-09-28'
  },
  {
    id: 'rev_3',
    listingId: 'lst_4',
    authorId: 'usr_1',
    author: currentUser,
    rating: 5,
    communicationRating: 5,
    qualityRating: 5,
    timelinessRating: 5,
    comment: 'The MacBook Pro M3 Max performed flawlessly for our 4K video editing render queue. Smooth handover in Uttara.',
    createdAt: '2026-10-02'
  }
];

export const initialMessages: Message[] = [
  {
    id: 'msg_1',
    senderId: 'usr_1',
    receiverId: 'usr_2',
    listingId: 'lst_1',
    content: 'Hi Labib! Is the Sony a7IV kit available for pickup this coming Tuesday morning around 9:00 AM at Banani?',
    createdAt: '2026-10-17T10:30:00Z',
    read: true
  },
  {
    id: 'msg_2',
    senderId: 'usr_2',
    receiverId: 'usr_1',
    listingId: 'lst_1',
    content: 'Hey Raisul! Yes, it is fully available, tested, and all 3 batteries will be charged to 100%. See you Tuesday morning!',
    createdAt: '2026-10-17T11:05:00Z',
    read: true
  },
  {
    id: 'msg_3',
    senderId: 'usr_3',
    receiverId: 'usr_1',
    listingId: 'lst_2',
    content: 'Hello Raisul! Thank you for requesting The Daylight Loft in Dhanmondi. We have prepared the Wi-Fi credentials and floor plan for your shoot.',
    createdAt: '2026-10-18T14:15:00Z',
    read: true
  }
];

const getStoredData = <T>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') return initialValue;
  try {
    const item = window.localStorage.getItem(`lendora_bd_${key}`);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return initialValue;
  }
};

const setStoredData = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(`lendora_bd_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

export const getListings = (): Listing[] => getStoredData('listings', initialListings);
export const saveListings = (listings: Listing[]) => setStoredData('listings', listings);

export const getBookings = (): Booking[] => getStoredData('bookings', initialBookings);
export const saveBookings = (bookings: Booking[]) => setStoredData('bookings', bookings);

export const getReviews = (): Review[] => getStoredData('reviews', initialReviews);
export const saveReviews = (reviews: Review[]) => setStoredData('reviews', reviews);

export const getMessages = (): Message[] => getStoredData('messages', initialMessages);
export const saveMessages = (messages: Message[]) => setStoredData('messages', messages);
