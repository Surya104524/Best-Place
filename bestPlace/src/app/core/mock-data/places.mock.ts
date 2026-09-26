import { Place } from '../models/place.model';

export const MOCK_PLACES: Place[] = [
  {
    id: 'quantum-coffee-lab',
    slug: 'quantum-coffee-lab',
    name: 'Quantum Coffee Lab',
    tagline: 'Specialty Micro-Roastery, Precision Pour-Overs & Minimalist Concrete Aesthetic',
    districtId: 'coimbatore',
    districtName: 'Coimbatore',
    areaId: 'rs-puram',
    areaName: 'R.S. Puram',
    categoryId: 'cafes',
    categoryName: 'Cafés & Roasteries',
    categoryEmoji: '☕',
    rating: 4.9,
    reviewCount: 276,
    priceLevel: '$$',
    heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Quantum Coffee Lab represents the pinnacle of third-wave coffee craft in Coimbatore. Hidden in a serene lane of R.S. Puram, this laboratory-inspired sanctuary marries brutalist concrete architecture with warm Japanese oak accents and lush indoor tropical foliage. Featuring state-of-the-art Slayer espresso machines and rotating single-origin beans sourced directly from certified organic estates in the Anamalai and Nilgiri ranges, every extraction is calibrated with obsessive precision.',
    curatorVerdict: 'An absolute benchmark for remote work and serious coffee connoisseurs. The pour-over flights and sourdough toasts are unmissable.',
    highlights: [
      'Perfect for deep-focus remote work',
      'Single-origin estate batch brews',
      'Dedicated silent work pods with power',
      'Artisanal sourdough bakery kitchen',
      'Quiet pet-friendly courtyard'
    ],
    amenities: [
      { id: 'wifi', name: 'High-Speed Fiber Wi-Fi (140 Mbps)', iconName: 'wifi', isHighlight: true },
      { id: 'power', name: 'Universal Power Outlets at Every Table', iconName: 'zap', isHighlight: true },
      { id: 'parking', name: 'Valet & Dedicated 2-Wheeler Zone', iconName: 'car', isHighlight: true },
      { id: 'ac', name: 'Climate Controlled Air-Conditioning', iconName: 'snowflake', isHighlight: false },
      { id: 'outdoor', name: 'Open-Air Zen Courtyard', iconName: 'trees', isHighlight: true },
      { id: 'pets', name: 'Pet Friendly Outdoor Deck', iconName: 'paw', isHighlight: false },
      { id: 'cards', name: 'Contactless Cards & Apple Pay / UPI', iconName: 'credit-card', isHighlight: false }
    ],
    address: '42/B, West Venkataswamy Road, R.S. Puram, Coimbatore, Tamil Nadu 641002',
    coordinates: { lat: 11.0082, lng: 76.9485 },
    phone: '+91 422 498 7200',
    websiteUrl: 'https://quantumcoffeelab.example.com',
    instagramHandle: '@quantumcoffeelab',
    openingHours: [
      { day: 'Monday – Friday', open: '07:30 AM', close: '10:30 PM' },
      { day: 'Saturday – Sunday', open: '07:00 AM', close: '11:00 PM' }
    ],
    isOpenNow: true,
    closingTimeToday: '10:30 PM',
    insights: {
      bestTime: {
        slot: '8:30 AM – 11:30 AM & 4:00 PM – 6:30 PM',
        vibeReason: 'Morning pour-overs with gentle morning sunlight through floor-to-ceiling glass'
      },
      crowdLevel: {
        status: 'low',
        label: 'Low to Moderate — Ideal for meetings and focus',
        scorePercentage: 30
      },
      wifi: {
        speedMbps: 140,
        status: 'fast',
        workScore: 9.8,
        label: 'Ultra-Fast Fiber (140 Mbps) • Ping 6ms'
      },
      noiseLevel: {
        decibels: 42,
        status: 'quiet',
        label: 'Quiet (42 dB) — Mellow Lo-Fi beats, ideal for focus'
      },
      parkingEase: {
        status: 'valet',
        label: 'Valet parking available + rear car bay'
      },
      aiRecommendation: 'Order the Anamalai Honey-Processed Pour-Over alongside the Whipped Ricotta Fig Toast. Choose table #4 by the indoor ficus tree for the quietest power nook.',
      curatorSignatureNote: 'Independently verified & reviewed by Best Place Editorial Lead (Aug 2026)',
      instagramSpotScore: 9.7
    },
    tags: ['Specialty Coffee', 'Work Friendly', 'Pour Over', 'Aesthetic', 'R.S. Puram'],
    isFeatured: true,
    isTrending: true,
    isPlaceOfDay: true,
    badge: "Curator's #1 Coffee Lab"
  },
  {
    id: 'solarium-botanical-bistro',
    slug: 'solarium-botanical-bistro',
    name: 'Solarium Botanical Bistro',
    tagline: 'Glasshouse Dining, Farm-to-Fork Gastronomy & Shaded Garden Terraces',
    districtId: 'coimbatore',
    districtName: 'Coimbatore',
    areaId: 'race-course',
    areaName: 'Race Course',
    categoryId: 'fine-dining',
    categoryName: 'Restaurants & Fine Dining',
    categoryEmoji: '🍽️',
    rating: 4.8,
    reviewCount: 318,
    priceLevel: '$$$',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Enclosed within an architectural greenhouse along Coimbatore’s storied Race Course boulevard, Solarium Botanical Bistro celebrates hyper-local organic agriculture. Over 300 botanical specimens line the glass ceiling, filtering natural dappled sunlight over handmade terracotta tabletops. The seasonal menu highlights microgreens grown in their on-site hydroponic pavilion.',
    curatorVerdict: 'Exceptional date night and weekend brunch venue with transcendent botanical aesthetics and refined culinary technique.',
    highlights: [
      'Stunning glasshouse architecture & foliage',
      'On-site hydroponic microgreens garden',
      'Handcrafted zero-proof botanical cocktails',
      'Scenic terrace facing Race Course greenery',
      'Romantic evening ambient fairy lighting'
    ],
    amenities: [
      { id: 'valet', name: 'Complimentary Valet Parking', iconName: 'car', isHighlight: true },
      { id: 'outdoor', name: 'Botanical Glasshouse & Al Fresco Patio', iconName: 'trees', isHighlight: true },
      { id: 'reservations', name: 'Advance Table Booking Available', iconName: 'calendar', isHighlight: true },
      { id: 'cocktails', name: 'Artisan Mocktails & Beverage Lab', iconName: 'glass-water', isHighlight: true },
      { id: 'ac', name: 'Dual-Zone Air Purification & Climate Control', iconName: 'snowflake', isHighlight: false }
    ],
    address: '18, Race Course Road, Opposite Thomas Park, Coimbatore, Tamil Nadu 641018',
    coordinates: { lat: 11.0028, lng: 76.9742 },
    phone: '+91 422 435 8899',
    websiteUrl: 'https://solariumbistro.example.com',
    instagramHandle: '@solarium.cbe',
    openingHours: [
      { day: 'Monday – Sunday', open: '11:30 AM', close: '11:00 PM' }
    ],
    isOpenNow: true,
    closingTimeToday: '11:00 PM',
    insights: {
      bestTime: {
        slot: '7:00 PM – 9:30 PM',
        vibeReason: 'Candlelit dining with warm acoustics and gentle breeze through the glass dome'
      },
      crowdLevel: {
        status: 'moderate',
        label: 'Moderate — Table reservation strongly recommended on weekends',
        scorePercentage: 65
      },
      wifi: {
        speedMbps: 85,
        status: 'fast',
        workScore: 7.5,
        label: 'High Speed (85 Mbps) • Leisure focused'
      },
      noiseLevel: {
        decibels: 54,
        status: 'moderate',
        label: 'Moderate (54 dB) — Elegant dining chatter and ambient jazz'
      },
      parkingEase: {
        status: 'valet',
        label: 'Seamless Valet at the front porch'
      },
      aiRecommendation: 'Reserve the Dome Table 2 days in advance. Don’t miss the Truffle & Wild Mushroom Risotto and the Smoked Rosemary Pomegranate Spritz.',
      curatorSignatureNote: 'Selected for Best Place Culinary Excellence Award 2026',
      instagramSpotScore: 9.9
    },
    tags: ['Fine Dining', 'Glasshouse', 'Date Spot', 'Organic', 'Race Course'],
    isFeatured: true,
    isTrending: true,
    badge: 'Best Romantic Glasshouse'
  },
  {
    id: 'horizon-sky-deck',
    slug: 'horizon-sky-deck',
    name: 'Horizon Sky Deck & Lounge',
    tagline: '14th Floor Panoramic Skyline Views, Sunset Mixology & Infinity Water Feature',
    districtId: 'coimbatore',
    districtName: 'Coimbatore',
    areaId: 'gandhipuram',
    areaName: 'Gandhipuram',
    categoryId: 'rooftops',
    categoryName: 'Rooftops & Lounges',
    categoryEmoji: '🌃',
    rating: 4.85,
    reviewCount: 412,
    priceLevel: '$$$',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Perched high above the city skyline on the 14th floor, Horizon Sky Deck offers 360-degree vistas stretching all the way to the blue silhouettes of the Western Ghats. Featuring sunken lounge seating surrounded by a perimeter infinity water reflection pool, craft zero-proof tonics, and an acoustic sound lounge, it transforms every twilight into an unforgettable spectacle.',
    curatorVerdict: 'The most impressive sunset vantage point in the central district. Sensational lighting design after dusk.',
    highlights: [
      '360° unobstructed city & mountain panorama',
      'Sunken fireside sofa seating pods',
      'Sunset DJ sessions on Friday & Saturday',
      'Artisanal tapas & global small plates',
      'High-speed private elevator access'
    ],
    amenities: [
      { id: 'skyview', name: 'Open Air Rooftop Deck', iconName: 'mountain', isHighlight: true },
      { id: 'valet', name: 'Basement Parking with Valet', iconName: 'car', isHighlight: true },
      { id: 'cocktails', name: 'Sunset Mixology Bar', iconName: 'glass-water', isHighlight: true },
      { id: 'music', name: 'Curated Acoustic Sound System', iconName: 'music', isHighlight: true },
      { id: 'elevator', name: 'Express High-Speed Elevator', iconName: 'zap', isHighlight: false }
    ],
    address: 'Horizon Tower 14th Fl, 100 Feet Road, Gandhipuram, Coimbatore, Tamil Nadu 641012',
    coordinates: { lat: 11.0185, lng: 76.9665 },
    phone: '+91 422 670 4400',
    websiteUrl: 'https://horizonskydeck.example.com',
    instagramHandle: '@horizonskydeck',
    openingHours: [
      { day: 'Monday – Thursday', open: '04:30 PM', close: '11:30 PM' },
      { day: 'Friday – Sunday', open: '04:00 PM', close: '12:30 AM' }
    ],
    isOpenNow: true,
    closingTimeToday: '11:30 PM',
    insights: {
      bestTime: {
        slot: '5:45 PM – 7:15 PM',
        vibeReason: 'Golden Hour sunset transition over the Nilgiri foothills'
      },
      crowdLevel: {
        status: 'high',
        label: 'High from 6 PM onwards — Arrive by 5:30 PM or pre-book',
        scorePercentage: 85
      },
      wifi: {
        speedMbps: 65,
        status: 'moderate',
        workScore: 6.0,
        label: 'Standard (65 Mbps) • Lounge vibe'
      },
      noiseLevel: {
        decibels: 60,
        status: 'lively',
        label: 'Lively (60 dB) — Upbeat lounge tunes & social vibe'
      },
      parkingEase: {
        status: 'valet',
        label: 'Multi-level basement parking with elevator access'
      },
      aiRecommendation: 'Request West Deck Pod #8 around 5:30 PM to catch the sun sinking behind the mountain peaks with a signature Passionfruit Smoke tonic.',
      curatorSignatureNote: 'Voted #1 Rooftop Experience by Best Place community',
      instagramSpotScore: 9.8
    },
    tags: ['Rooftop', 'Sunset View', 'Nightlife', 'Skyline', 'Lounge'],
    isFeatured: true,
    isTrending: true,
    badge: 'Premier Sunset Rooftop'
  },
  {
    id: 'mistwood-observatory',
    slug: 'mistwood-observatory',
    name: 'The Mistwood Observatory & Cloud Deck',
    tagline: 'High-Altitude Forest Overlook, Misty Valley Panoramas & Mountain Tea Salon',
    districtId: 'coimbatore',
    districtName: 'Coimbatore',
    areaId: 'marudhamalai-foothills',
    areaName: 'Marudhamalai & Vadavalli',
    categoryId: 'viewpoints',
    categoryName: 'Scenic Viewpoints',
    categoryEmoji: '🌄',
    rating: 4.95,
    reviewCount: 189,
    priceLevel: '$$',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Nestled along the ridge of the Marudhamalai foothills where cool mountain gusts meet the Coimbatore plains, The Mistwood Observatory is a timber-cantilevered sky platform. Built with sustainable reclaimed teak and tempered glass railings, it offers an unpolluted vista of rolling cloud formations and migratory bird trails.',
    curatorVerdict: 'The quintessential tranquil escape from city clamor. The artisanal spiced chai and mountain honey pastries complement the cool mist perfectly.',
    highlights: [
      'Cantilevered glass skywalk extending over the ridge',
      'Frequent low-hanging cloud mist rolling in',
      'Zero light pollution for early evening stargazing',
      'Organic Nilgiri single-estate tea bar',
      'Quiet meditation and reading benches'
    ],
    amenities: [
      { id: 'view', name: 'Panoramic Mountain & Valley Overlook', iconName: 'mountain', isHighlight: true },
      { id: 'parking', name: 'Scenic Hillside Car Parking', iconName: 'car', isHighlight: true },
      { id: 'tea', name: 'Artisan Estate Tea & Coffee Bar', iconName: 'coffee', isHighlight: true },
      { id: 'seating', name: 'Heated Outdoor Seating Benches', iconName: 'trees', isHighlight: false }
    ],
    address: 'Ridge Point 4, Marudhamalai Ghat Road, Vadavalli, Coimbatore, Tamil Nadu 641046',
    coordinates: { lat: 11.0450, lng: 76.8520 },
    phone: '+91 422 242 1180',
    websiteUrl: 'https://mistwoodobservatory.example.com',
    instagramHandle: '@mistwood.deck',
    openingHours: [
      { day: 'Monday – Sunday', open: '06:00 AM', close: '08:30 PM' }
    ],
    isOpenNow: true,
    closingTimeToday: '08:30 PM',
    insights: {
      bestTime: {
        slot: '6:15 AM – 8:30 AM & 5:00 PM – 7:00 PM',
        vibeReason: 'Early morning cloud sea formation or twilight purple valley shadows'
      },
      crowdLevel: {
        status: 'low',
        label: 'Low — Serene and peaceful atmosphere',
        scorePercentage: 20
      },
      wifi: {
        speedMbps: 45,
        status: 'moderate',
        workScore: 6.5,
        label: 'Moderate 4G/5G Wireless • Nature retreat'
      },
      noiseLevel: {
        decibels: 32,
        status: 'quiet',
        label: 'Ultra Quiet (32 dB) — Whispering pines and birdsong'
      },
      parkingEase: {
        status: 'easy',
        label: 'Dedicated private gravel lot with security'
      },
      aiRecommendation: 'Arrive at 6:15 AM with a light windbreaker. Watch the sunrise break over the mist while sipping hot Silver Needle White Tea.',
      curatorSignatureNote: 'Hidden Nature Gem verified by Best Place Expedition Team',
      instagramSpotScore: 9.9
    },
    tags: ['Scenic Viewpoint', 'Misty Foothills', 'Sunrise & Sunset', 'Peaceful', 'Nature'],
    isFeatured: true,
    isTrending: false,
    badge: 'Secret Scenic Peak'
  },
  {
    id: 'eclipse-speakeasy-vinyl',
    slug: 'eclipse-speakeasy-vinyl',
    name: 'Eclipse Secret Speakeasy & Vinyl Den',
    tagline: 'Concealed Behind an Antique Clockmaker Shop • Vinyl Warmth & Bespoke Infusions',
    districtId: 'coimbatore',
    districtName: 'Coimbatore',
    areaId: 'peelamedu',
    areaName: 'Peelamedu & Avinashi Road',
    categoryId: 'hidden-gems',
    categoryName: 'Secret & Hidden Gems',
    categoryEmoji: '🔐',
    rating: 4.92,
    reviewCount: 154,
    priceLevel: '$$$',
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Disguised behind the functioning wooden facade of an antique horology atelier in Peelamedu, Eclipse reveals an opulent, low-lit subterranean speakeasy. Featuring leather club chairs, vintage McIntosh tube amplifiers spinning Japanese jazz vinyl, and bespoke botanical infusions prepared by master bartenders.',
    curatorVerdict: 'Coimbatore’s most strictly guarded secret. An intimate, world-class listening lounge experience.',
    highlights: [
      'Concealed bookcase doorway entry',
      'Over 2,000 vintage vinyl records spinning live',
      'Bespoke craft infusions & aged barrel tonics',
      'No photography policy preserves intimate vibe',
      'Strict reservation-only access'
    ],
    amenities: [
      { id: 'vinyl', name: 'Analog Audiophile Vinyl Audio', iconName: 'music', isHighlight: true },
      { id: 'valet', name: 'Discrete Rear Valet Service', iconName: 'car', isHighlight: true },
      { id: 'ac', name: 'Subterranean Climate Control', iconName: 'snowflake', isHighlight: true },
      { id: 'reservations', name: 'Code-Password Entry via Reservation', iconName: 'lock', isHighlight: true }
    ],
    address: 'Near Old Aerodrome Crossing, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004',
    coordinates: { lat: 11.0260, lng: 77.0120 },
    phone: '+91 422 477 9901',
    websiteUrl: 'https://eclipsevinyl.example.com',
    instagramHandle: '@eclipsespeakeasy',
    openingHours: [
      { day: 'Wednesday – Sunday', open: '06:30 PM', close: '01:00 AM' },
      { day: 'Monday – Tuesday', open: 'Closed', close: 'Closed', isClosed: true }
    ],
    isOpenNow: true,
    closingTimeToday: '01:00 AM',
    insights: {
      bestTime: {
        slot: '8:00 PM – 11:30 PM',
        vibeReason: 'Pure analog vinyl warmth with vintage jazz and low-amber lighting'
      },
      crowdLevel: {
        status: 'moderate',
        label: 'Limited seating by design (35 seats total)',
        scorePercentage: 50
      },
      wifi: {
        speedMbps: 20,
        status: 'limited',
        workScore: 3.0,
        label: 'Phone-free conversational experience'
      },
      noiseLevel: {
        decibels: 48,
        status: 'moderate',
        label: 'Mellow (48 dB) — Rich acoustic music and quiet murmur'
      },
      parkingEase: {
        status: 'valet',
        label: 'Discrete rear door valet drop'
      },
      aiRecommendation: 'Book the Chesterfield Alcove and request the Smoked Clove Old Fashioned while listening to Miles Davis on the turntable.',
      curatorSignatureNote: 'Curator Secret Passport Discovery 2026',
      instagramSpotScore: 9.5
    },
    tags: ['Speakeasy', 'Secret Bar', 'Vinyl Lounge', 'Audiophile', 'Peelamedu'],
    isFeatured: true,
    isTrending: true,
    badge: 'Secret Speakeasy #1'
  },
  {
    id: 'serenity-valley-plantation-villa',
    slug: 'serenity-valley-plantation-villa',
    name: 'Serenity Valley Plantation Villa',
    tagline: '1890s Heritage Tea Estate, Private Cloud Decks & Organic Hillside Dining',
    districtId: 'nilgiris',
    districtName: 'Nilgiris (Ooty & Coonoor)',
    areaId: 'coonoor-ridge',
    areaName: 'Upper Coonoor & Tea Estates',
    categoryId: 'stays',
    categoryName: 'Hotels & Boutique Stays',
    categoryEmoji: '🏨',
    rating: 4.97,
    reviewCount: 142,
    priceLevel: '$$$$',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Perched on a private 50-acre working biodynamic tea estate in Upper Coonoor, Serenity Valley Plantation Villa is an impeccably restored colonial stone manor. Surrounded by centuries-old eucalyptus groves and cascading tea terraces, each suite features working granite fireplaces, freestanding clawfoot tubs, and glass sunrooms overlooking the cloud basin.',
    curatorVerdict: 'The ultimate luxury mountain sanctuary in South India. Unmatched hospitality, solitude, and culinary refinement.',
    highlights: [
      'Private 50-acre tea estate walking trails',
      'Granite wood-burning fireplaces in every suite',
      'Private estate chef preparing customized meals',
      'Heated infinity plunge pool overlooking valley',
      'Daily guided tea tasting and forest walks'
    ],
    amenities: [
      { id: 'fireplace', name: 'Wood-burning Fireplace in Room', iconName: 'zap', isHighlight: true },
      { id: 'pool', name: 'Heated Infinity Plunge Pool', iconName: 'sparkles', isHighlight: true },
      { id: 'wifi', name: 'Starlink High-Speed Wi-Fi (110 Mbps)', iconName: 'wifi', isHighlight: true },
      { id: 'chef', name: 'Private Gourmet Chef Service', iconName: 'utensils', isHighlight: true },
      { id: 'parking', name: 'Private Estate Chauffeur & Parking', iconName: 'car', isHighlight: false }
    ],
    address: 'Estate Road 7, Brooklands, Upper Coonoor, The Nilgiris, Tamil Nadu 643101',
    coordinates: { lat: 11.3530, lng: 76.7950 },
    phone: '+91 423 223 8811',
    websiteUrl: 'https://serenityvalleyestate.example.com',
    instagramHandle: '@serenityvalleyvilla',
    openingHours: [
      { day: 'Check-in: 02:00 PM', open: '24/7 Front Desk', close: 'Check-out: 11:00 AM' }
    ],
    isOpenNow: true,
    closingTimeToday: '24/7 Open',
    insights: {
      bestTime: {
        slot: 'All year around • Peak beauty Sep – Mar',
        vibeReason: 'Crisp mountain air, evening fireside wine and morning valley mist'
      },
      crowdLevel: {
        status: 'low',
        label: 'Ultra Exclusive — Only 6 boutique private suites',
        scorePercentage: 10
      },
      wifi: {
        speedMbps: 110,
        status: 'fast',
        workScore: 9.5,
        label: 'Fast Starlink (110 Mbps) • Mountain retreat with fiber backup'
      },
      noiseLevel: {
        decibels: 28,
        status: 'quiet',
        label: 'Whisper Quiet (28 dB) — Rustling tea leaves and mountain breezes'
      },
      parkingEase: {
        status: 'easy',
        label: 'Private secure estate parking with EV charging station'
      },
      aiRecommendation: 'Book the Cloud Suite with the wrap-around veranda. Request the high tea service on the east lawn during the 4:30 PM mist roll-in.',
      curatorSignatureNote: 'Awarded #1 Boutique Mountain Stay 2026',
      instagramSpotScore: 10.0
    },
    tags: ['Boutique Stay', 'Tea Estate', 'Luxury Villa', 'Mountain View', 'Coonoor'],
    isFeatured: true,
    isTrending: false,
    badge: 'Premier Mountain Retreat'
  },
  {
    id: 'terra-cotta-courtyard',
    slug: 'terra-cotta-courtyard',
    name: 'Terra Cotta Heritage Courtyard & Kitchen',
    tagline: 'Centennial Chettinad Architecture, Brass Lanterns & Slow-Cooked Clay Pot Delicacies',
    districtId: 'coimbatore',
    districtName: 'Coimbatore',
    areaId: 'saibaba-colony',
    areaName: 'Saibaba Colony',
    categoryId: 'fine-dining',
    categoryName: 'Restaurants & Fine Dining',
    categoryEmoji: '🍽️',
    rating: 4.88,
    reviewCount: 220,
    priceLevel: '$$',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A loving restoration of a 95-year-old courtyard thinnai home in Saibaba Colony, Terra Cotta combines antique teak pillars and handmade Athangudi floor tiles with modern slow-cooked regional gastronomy. Traditional recipes are prepared in earthen clay pots over slow wood fires, paired with refreshing tender coconut and kokum reductions.',
    curatorVerdict: 'Soul-stirring regional food served in an atmosphere of serene, timeless heritage.',
    highlights: [
      'Restored central rainwater courtyard atrium',
      'Heritage Athangudi tiles and antique teak pillars',
      'Clay pot slow cooking with organic local spices',
      'Handcrafted brass tableware presentation',
      'Live Carnatic instrumental flute on Sundays'
    ],
    amenities: [
      { id: 'courtyard', name: 'Open Air Traditional Courtyard', iconName: 'trees', isHighlight: true },
      { id: 'parking', name: 'Valet Parking on Main Road', iconName: 'car', isHighlight: true },
      { id: 'family', name: 'Family & Group Feast Seating', iconName: 'sparkles', isHighlight: true },
      { id: 'ac', name: 'Air Conditioned Heritage Hall', iconName: 'snowflake', isHighlight: false }
    ],
    address: '22, Bharathi Park 7th Cross, Saibaba Colony, Coimbatore, Tamil Nadu 641011',
    coordinates: { lat: 11.0250, lng: 76.9420 },
    phone: '+91 422 244 5566',
    websiteUrl: 'https://terracottacourtyard.example.com',
    instagramHandle: '@terracotta.cbe',
    openingHours: [
      { day: 'Lunch', open: '12:00 PM', close: '03:30 PM' },
      { day: 'Dinner', open: '07:00 PM', close: '10:45 PM' }
    ],
    isOpenNow: true,
    closingTimeToday: '10:45 PM',
    insights: {
      bestTime: {
        slot: '12:30 PM – 2:30 PM & 7:30 PM – 9:45 PM',
        vibeReason: 'Courtyard breeze and acoustic flute notes under soft brass oil lamps'
      },
      crowdLevel: {
        status: 'moderate',
        label: 'Moderate — Family gatherings on weekends',
        scorePercentage: 55
      },
      wifi: {
        speedMbps: 60,
        status: 'moderate',
        workScore: 6.0,
        label: 'Standard Wi-Fi available'
      },
      noiseLevel: {
        decibels: 50,
        status: 'moderate',
        label: 'Pleasant (50 dB) — Gentle courtyard fountain and acoustic music'
      },
      parkingEase: {
        status: 'valet',
        label: 'Dedicated valet at Bharathi Park corner'
      },
      aiRecommendation: 'Order the Clay Pot Bamboo Biryani and the Elaneer Payasam. Ask for the Courtyard Center table under the star sky.',
      curatorSignatureNote: 'Heritage Preservation & Dining Excellence Choice 2026',
      instagramSpotScore: 9.6
    },
    tags: ['Heritage Dining', 'Courtyard', 'Chettinad', 'Clay Pot', 'Saibaba Colony'],
    isFeatured: false,
    isTrending: true,
    badge: 'Heritage Courtyard Gem'
  },
  {
    id: 'celestial-artisan-roastery',
    slug: 'celestial-artisan-roastery',
    name: 'Celestial Artisan Roastery & Lab',
    tagline: 'Art Deco Glasshouse, Nitrogen Cold Brews & Single-Origin Espresso flights',
    districtId: 'chennai',
    districtName: 'Chennai',
    areaId: 'nungambakkam',
    areaName: 'Nungambakkam',
    categoryId: 'cafes',
    categoryName: 'Cafés & Roasteries',
    categoryEmoji: '☕',
    rating: 4.91,
    reviewCount: 384,
    priceLevel: '$$',
    heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Situated in Chennai’s diplomatic heart, Celestial Artisan Roastery is housed in a restored 1940s Art Deco bungalow with soaring ceilings, terrazzo floors, and an in-house Giesen roasting facility. Renowned for its nitrogen draft taps, specialty cascades, and artisanal pastry atelier.',
    curatorVerdict: 'Chennai’s premier specialty roastery. Extraordinary coffee consistency and sublime interior architecture.',
    highlights: [
      'Live in-house roasting theatre',
      'Nitrogen draft cold brew bar on tap',
      'High-speed fiber connectivity for remote creators',
      'Handmade French viennoiserie baked fresh daily'
    ],
    amenities: [
      { id: 'wifi', name: 'Superfast Fiber (160 Mbps)', iconName: 'wifi', isHighlight: true },
      { id: 'power', name: 'AC & Power Outlets at Work Bar', iconName: 'zap', isHighlight: true },
      { id: 'valet', name: 'Valet Service', iconName: 'car', isHighlight: true }
    ],
    address: '8, Anderson Road, Nungambakkam, Chennai, Tamil Nadu 600006',
    coordinates: { lat: 13.0604, lng: 80.2405 },
    phone: '+91 44 4890 2200',
    websiteUrl: 'https://celestialroastery.example.com',
    instagramHandle: '@celestialroastery',
    openingHours: [
      { day: 'Daily', open: '07:00 AM', close: '11:00 PM' }
    ],
    isOpenNow: true,
    closingTimeToday: '11:00 PM',
    insights: {
      bestTime: {
        slot: '8:00 AM – 11:00 AM & 3:30 PM – 6:00 PM',
        vibeReason: 'Golden morning light filtering through Art Deco leaded glass'
      },
      crowdLevel: {
        status: 'moderate',
        label: 'Active creative and remote worker hub',
        scorePercentage: 60
      },
      wifi: {
        speedMbps: 160,
        status: 'fast',
        workScore: 9.9,
        label: 'Gigabit Fiber (160 Mbps) • Flawless zoom calls'
      },
      noiseLevel: {
        decibels: 46,
        status: 'moderate',
        label: 'Moderate (46 dB) — Soft lo-fi ambient soundtrack'
      },
      parkingEase: {
        status: 'valet',
        label: 'Valet parking at Anderson Road entry'
      },
      aiRecommendation: 'Try the Yirgacheffe Natural Chemex with the Almond Croissant. Sit at the mezzanine wooden counter for maximum focus.',
      curatorSignatureNote: 'Top Roastery Selection 2026',
      instagramSpotScore: 9.7
    },
    tags: ['Specialty Coffee', 'Art Deco', 'Work Friendly', 'Nungambakkam', 'Chennai'],
    isFeatured: true,
    isTrending: false,
    badge: 'Art Deco Roastery Icon'
  },
  {
    id: 'baywatch-shoreline-cabana',
    slug: 'baywatch-shoreline-cabana',
    name: 'Baywatch Shoreline Cabana & Sunset Deck',
    tagline: 'Private Sand Dunes, Ocean Breeze Cabanas & Coastal Seafood Grill',
    districtId: 'chennai',
    districtName: 'Chennai',
    areaId: 'ecr-beach',
    areaName: 'ECR & Neelankarai',
    categoryId: 'rooftops',
    categoryName: 'Rooftops & Lounges',
    categoryEmoji: '🌃',
    rating: 4.86,
    reviewCount: 295,
    priceLevel: '$$$',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Set on the edge of the Bay of Bengal along East Coast Road, Baywatch offers teak cabanas set directly on private sands. Enjoy fresh sea breezes, live acoustic sunset sessions, and wood-grilled coastal catch with tropical zero-proof cocktails.',
    curatorVerdict: 'The quintessential coastal sunset experience in Tamil Nadu. The sea breeze and candlelit beach tables are mesmerizing.',
    highlights: [
      'Direct beach access with private sunset cabanas',
      'Wood-fired grilled catch of the day',
      'Live acoustic guitar and saxophone sets at dusk',
      'Romantic candlelit seaside dinner setups'
    ],
    amenities: [
      { id: 'beach', name: 'Private Beachfront Cabanas', iconName: 'sun', isHighlight: true },
      { id: 'valet', name: 'Gated Parking with Valet', iconName: 'car', isHighlight: true },
      { id: 'music', name: 'Live Sunset Music Sessions', iconName: 'music', isHighlight: true }
    ],
    address: 'Plot 4, Beach Avenue, Neelankarai, ECR, Chennai, Tamil Nadu 600115',
    coordinates: { lat: 12.9480, lng: 80.2580 },
    phone: '+91 44 2449 8830',
    websiteUrl: 'https://baywatchcabana.example.com',
    instagramHandle: '@baywatch.ecr',
    openingHours: [
      { day: 'Tuesday – Sunday', open: '03:30 PM', close: '11:45 PM' },
      { day: 'Monday', open: 'Closed', close: 'Closed', isClosed: true }
    ],
    isOpenNow: true,
    closingTimeToday: '11:45 PM',
    insights: {
      bestTime: {
        slot: '5:15 PM – 7:30 PM',
        vibeReason: 'Sunset sea mist, ocean breeze and twilight torch lighting'
      },
      crowdLevel: {
        status: 'moderate',
        label: 'High demand during sunset hours — Reserve cabana early',
        scorePercentage: 70
      },
      wifi: {
        speedMbps: 50,
        status: 'moderate',
        workScore: 5.5,
        label: 'Beach Wi-Fi available'
      },
      noiseLevel: {
        decibels: 55,
        status: 'moderate',
        label: 'Soothing (55 dB) — Ocean wave crashes and live acoustic music'
      },
      parkingEase: {
        status: 'valet',
        label: 'Private gated beach parking'
      },
      aiRecommendation: 'Reserve Cabana #3 for direct uninterrupted ocean views. Enjoy the Grilled King Prawns with the Kaffir Lime Coconut Cooler.',
      curatorSignatureNote: 'Best Coastal Atmosphere Award 2026',
      instagramSpotScore: 9.8
    },
    tags: ['Beachfront', 'Cabana', 'Sunset View', 'Seafood', 'ECR'],
    isFeatured: true,
    isTrending: true,
    badge: 'Coastal Sunset Cabana'
  }
];
