export interface SmartInsights {
  bestTime: {
    slot: string; // e.g. "6:00 PM – 8:30 PM"
    vibeReason: string; // e.g. "Sunset Golden Hour & live acoustic jazz"
  };
  crowdLevel: {
    status: 'low' | 'moderate' | 'high';
    label: string; // e.g. "Low — Perfect for quiet work"
    scorePercentage: number; // e.g. 25
  };
  wifi: {
    speedMbps: number; // e.g. 140
    status: 'fast' | 'moderate' | 'limited';
    workScore: number; // e.g. 9.8
    label: string; // e.g. "Ultra-Fast (140 Mbps) — Fiber optic"
  };
  noiseLevel: {
    decibels: number; // e.g. 42
    status: 'quiet' | 'moderate' | 'lively';
    label: string; // e.g. "Quiet (42 dB) — Great for calls & focus"
  };
  parkingEase: {
    status: 'easy' | 'valet' | 'street' | 'difficult';
    label: string; // e.g. "Dedicated Valet & Private Basement"
  };
  aiRecommendation: string; // e.g. "Visit around 5:45 PM and request the mezzanine window pod for the finest sunset valley vista."
  curatorSignatureNote: string; // e.g. "Verified by Best Place Lead Curator (Aug 2026)"
  instagramSpotScore: number; // 9.6 / 10
}

export interface Amenity {
  id: string;
  name: string;
  iconName: string;
  isHighlight?: boolean;
}

export interface OpeningHourDay {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  districtId: string;
  districtName: string;
  areaId: string;
  areaName: string;
  categoryId: string;
  categoryName: string;
  categoryEmoji: string;
  rating: number;
  reviewCount: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  heroImage: string;
  gallery: string[];
  description: string;
  curatorVerdict: string;
  highlights: string[];
  amenities: Amenity[];
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  websiteUrl: string;
  instagramHandle?: string;
  openingHours: OpeningHourDay[];
  isOpenNow: boolean;
  closingTimeToday: string;
  insights: SmartInsights;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isPlaceOfDay?: boolean;
  badge?: string; // e.g. "Curator's #1 Choice", "Hidden Gem", "Sunset Peak"
}
