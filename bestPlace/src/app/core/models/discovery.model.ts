export interface District {
  id: string;
  name: string;
  state: string;
  tagline: string;
  image: string;
  curatedPlacesCount: number;
  isPopular?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Area {
  id: string;
  districtId: string;
  name: string;
  tagline: string;
  image: string;
  curatedPlacesCount: number;
  vibe: string;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  emoji: string;
  tagline: string;
  image: string;
  curatedPlacesCount: number;
  accentColor: string;
}
