export interface Review {
  id: string;
  placeId: string;
  authorName: string;
  authorAvatar: string;
  isVerifiedVisit: boolean;
  visitType: 'Solo' | 'Couples' | 'Work / Remote' | 'Friends' | 'Family';
  rating: number;
  date: string;
  content: string;
  photos?: string[];
  helpfulCount: number;
  isHelpfulClicked?: boolean;
}

export interface RatingBreakdown {
  overall: number;
  ambience: number;
  quality: number;
  service: number;
  value: number;
  starsCount: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface BookingRequest {
  id?: string;
  placeId: string;
  placeName: string;
  placeImage: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  specialRequests?: string;
  seatingPreference?: 'Window View' | 'Outdoor Terrace' | 'Quiet Mezzanine' | 'Standard Lounge';
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}
