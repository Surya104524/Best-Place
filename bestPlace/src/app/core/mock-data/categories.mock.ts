import { Category } from '../models/discovery.model';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cafes',
    name: 'Cafés & Roasteries',
    slug: 'cafes',
    iconName: 'coffee',
    emoji: '☕',
    tagline: 'Artisanal pour-overs, single-origin roasts & peaceful laptop-friendly sanctuaries',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 42,
    accentColor: '#f59e0b'
  },
  {
    id: 'rooftops',
    name: 'Rooftops & Lounges',
    slug: 'rooftops',
    iconName: 'moon',
    emoji: '🌃',
    tagline: 'Skyline views, handcrafted mixology, ambient lighting & breezy night vibes',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 28,
    accentColor: '#8b5cf6'
  },
  {
    id: 'viewpoints',
    name: 'Scenic Viewpoints',
    slug: 'viewpoints',
    iconName: 'mountain',
    emoji: '🌄',
    tagline: 'Golden hour summits, foggy valley rims, lakefront perches & peaceful horizons',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 21,
    accentColor: '#06b6d4'
  },
  {
    id: 'hidden-gems',
    name: 'Secret & Hidden Gems',
    slug: 'hidden-gems',
    iconName: 'lock',
    emoji: '🔐',
    tagline: 'Tucked-away courtyard sanctuaries, private speakeasies & undiscovered spots',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 19,
    accentColor: '#ec4899'
  },
  {
    id: 'fine-dining',
    name: 'Restaurants & Fine Dining',
    slug: 'fine-dining',
    iconName: 'utensils',
    emoji: '🍽️',
    tagline: 'Chef-driven degustations, organic farm-to-table plates & elevated regional classics',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 35,
    accentColor: '#10b981'
  },
  {
    id: 'stays',
    name: 'Hotels & Boutique Stays',
    slug: 'stays',
    iconName: 'hotel',
    emoji: '🏨',
    tagline: 'Architectural villas, plantation estates, minimalist retreats & luxury escapes',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 24,
    accentColor: '#6366f1'
  },
  {
    id: 'experiences',
    name: 'Experiences & Activities',
    slug: 'experiences',
    iconName: 'sparkles',
    emoji: '🎉',
    tagline: 'Coffee cupping masterclasses, pottery workshops, sunset kayaking & live acoustic sets',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    curatedPlacesCount: 16,
    accentColor: '#e11d48'
  }
];
