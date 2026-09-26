import { District } from '../models/discovery.model';

export const MOCK_DISTRICTS: District[] = [
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    tagline: 'Manchester of South India • Specialty Cafés, Misty Foothills & Modern Gastronomy',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    curatedPlacesCount: 48,
    isPopular: true,
    coordinates: { lat: 11.0168, lng: 76.9558 }
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Coastal Metropolis • Sunset Beach Lounges, Heritage Bistros & Art Deco Roasteries',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    curatedPlacesCount: 64,
    isPopular: true,
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 'nilgiris',
    name: 'Nilgiris (Ooty & Coonoor)',
    state: 'Tamil Nadu',
    tagline: 'Blue Mountains • Cloud-Kissed Estates, Secret Overlooks & Colonial Tea Lounges',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    curatedPlacesCount: 32,
    isPopular: true,
    coordinates: { lat: 11.4102, lng: 76.6950 }
  },
  {
    id: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    tagline: 'Ancient Temple City • Rooftop Skyline Bars, Midnight Flavors & Courtyard Havens',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b743?auto=format&fit=crop&w=1200&q=80',
    curatedPlacesCount: 26,
    isPopular: true,
    coordinates: { lat: 9.9252, lng: 78.1198 }
  },
  {
    id: 'trichy',
    name: 'Trichy',
    state: 'Tamil Nadu',
    tagline: 'Historic River Valley • Kaveri Riverbank Cafés & Rockfort Panoramic Views',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
    curatedPlacesCount: 22,
    isPopular: false,
    coordinates: { lat: 10.7905, lng: 78.7047 }
  },
  {
    id: 'salem',
    name: 'Salem',
    state: 'Tamil Nadu',
    tagline: 'Yercaud Foothills • Mountain Coffee Outposts & Lush Botanical Dining',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    curatedPlacesCount: 19,
    isPopular: false,
    coordinates: { lat: 11.6643, lng: 78.1460 }
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Garden Capital • World-Class Microbreweries, Glasshouse Cafés & Tree-lined Promenades',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    curatedPlacesCount: 92,
    isPopular: true,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  }
];
