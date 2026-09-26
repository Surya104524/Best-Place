import { Review } from '../models/review.model';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    placeId: 'quantum-coffee-lab',
    authorName: 'Arun Krishnamurthy',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    isVerifiedVisit: true,
    visitType: 'Work / Remote',
    rating: 5,
    date: '3 days ago',
    content: 'Hands down the best specialty coffee space in Coimbatore. I spent 4 hours here wrapping up a sprint deadline — the Wi-Fi clocked at 142 Mbps with zero drops, and power outlets are available under almost every seat. The Anamalai single-origin V60 had vibrant notes of stone fruit and bergamot.',
    photos: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    placeId: 'quantum-coffee-lab',
    authorName: 'Sneha Narayanan',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    isVerifiedVisit: true,
    visitType: 'Friends',
    rating: 5,
    date: '1 week ago',
    content: 'The minimalist brutalist architecture here is breathtaking. The courtyard garden is so peaceful with the ficus tree in the center. Do not miss the Whipped Ricotta Fig sourdough toast — the balance of honey, sea salt, and fresh figs is divine!',
    helpfulCount: 28
  },
  {
    id: 'rev-3',
    placeId: 'quantum-coffee-lab',
    authorName: 'Vikram Sundaram',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isVerifiedVisit: true,
    visitType: 'Solo',
    rating: 4.8,
    date: '2 weeks ago',
    content: 'Baristas know their coffee science inside out. They walked me through extraction ratios and roast profiles. Valet parking on Venkataswamy Road was super quick.',
    helpfulCount: 15
  },
  {
    id: 'rev-4',
    placeId: 'solarium-botanical-bistro',
    authorName: 'Dr. Priya Ramachandran',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    isVerifiedVisit: true,
    visitType: 'Couples',
    rating: 5,
    date: '4 days ago',
    content: 'Celebrated our anniversary at Solarium and it was magical. Dining inside the glasshouse under hundreds of hanging ferns with fairy lights after 7:30 PM is an unforgettable experience. The Truffle Risotto and the Rosemary Spritz were Michelin caliber.',
    photos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 39
  },
  {
    id: 'rev-5',
    placeId: 'horizon-sky-deck',
    authorName: 'Karthik Raja',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isVerifiedVisit: true,
    visitType: 'Friends',
    rating: 5,
    date: '5 days ago',
    content: 'The 360 view from the 14th floor facing the Western Ghats is unmatched in Coimbatore. Arrive by 5:30 PM to grab the fireside sunken pod and watch the sunset sky turn purple and fiery orange.',
    photos: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 51
  },
  {
    id: 'rev-6',
    placeId: 'mistwood-observatory',
    authorName: 'Ananya Sridhar',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    isVerifiedVisit: true,
    visitType: 'Solo',
    rating: 5,
    date: '6 days ago',
    content: 'Came up here at 6:30 AM on a Sunday morning and caught the clouds rolling right beneath the glass skywalk. It feels like you are floating over the valley. The hot Nilgiri white tea warmed us up completely. A must-visit sanctuary.',
    helpfulCount: 64
  }
];
