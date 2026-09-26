import { Area } from '../models/discovery.model';

export const MOCK_AREAS: Area[] = [
  // Coimbatore Areas
  {
    id: 'rs-puram',
    districtId: 'coimbatore',
    name: 'R.S. Puram',
    tagline: 'Tree-lined avenues, boutique roasteries & heritage courtyards',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 14,
    vibe: 'Sophisticated & Culinary Hub',
    isPopular: true
  },
  {
    id: 'race-course',
    districtId: 'coimbatore',
    name: 'Race Course',
    tagline: 'Lush walking promenade, upscale glasshouse cafés & fine dining',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 12,
    vibe: 'Elite Green Belt & Evening Strolls',
    isPopular: true
  },
  {
    id: 'peelamedu',
    districtId: 'coimbatore',
    name: 'Peelamedu & Avinashi Road',
    tagline: 'Tech corridor hubs, modern co-working cafés & rooftop lounges',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 11,
    vibe: 'High-energy Tech & Workspaces',
    isPopular: true
  },
  {
    id: 'saibaba-colony',
    districtId: 'coimbatore',
    name: 'Saibaba Colony',
    tagline: 'Charming residential corners, hidden bakeries & quiet gardens',
    image: 'https://images.unsplash.com/photo-1445116572660-238410b47f40?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 8,
    vibe: 'Artisan & Peaceful Living',
    isPopular: false
  },
  {
    id: 'gandhipuram',
    districtId: 'coimbatore',
    name: 'Gandhipuram',
    tagline: 'Central transit heartbeat & rooftop city view lounges',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 7,
    vibe: 'Vibrant City Center',
    isPopular: false
  },
  {
    id: 'marudhamalai-foothills',
    districtId: 'coimbatore',
    name: 'Marudhamalai & Vadavalli',
    tagline: 'Misty foothill escapes, panoramic sunset decks & organic bistros',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 6,
    vibe: 'Scenic Foothills & Sunset Views',
    isPopular: true
  },

  // Chennai Areas
  {
    id: 'nungambakkam',
    districtId: 'chennai',
    name: 'Nungambakkam',
    tagline: 'Consulate quarter, chic European cafés & art galleries',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 18,
    vibe: 'Cosmopolitan & Trendy',
    isPopular: true
  },
  {
    id: 'ecr-beach',
    districtId: 'chennai',
    name: 'ECR & Neelankarai',
    tagline: 'Breezy coastal cabanas, sunset deck lounges & boutique villas',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 16,
    vibe: 'Coastal Chill & Sunset Vibe',
    isPopular: true
  },

  // Nilgiris Areas
  {
    id: 'coonoor-ridge',
    districtId: 'nilgiris',
    name: 'Upper Coonoor & Tea Estates',
    tagline: 'Colonial bungalows, tea tasting salons & cliffside overlooks',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 15,
    vibe: 'Cloud Forest & Serenity',
    isPopular: true
  }
];
