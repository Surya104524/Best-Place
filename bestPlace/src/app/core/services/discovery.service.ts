import { Injectable, signal, computed } from '@angular/core';
import { District, Area, Category } from '../models/discovery.model';
import { Place } from '../models/place.model';
import { MOCK_DISTRICTS } from '../mock-data/districts.mock';
import { MOCK_AREAS } from '../mock-data/areas.mock';
import { MOCK_CATEGORIES } from '../mock-data/categories.mock';
import { MOCK_PLACES } from '../mock-data/places.mock';

export interface PlaceFilters {
  districtId?: string;
  areaId?: string;
  categoryId?: string;
  searchQuery?: string;
  minRating?: number;
  priceLevels?: string[]; // e.g. ['$', '$$']
  amenityIds?: string[];
  openNowOnly?: boolean;
  sortBy?: 'recommended' | 'rating' | 'reviews' | 'name';
}

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {
  private readonly districtsSignal = signal<District[]>(MOCK_DISTRICTS);
  private readonly areasSignal = signal<Area[]>(MOCK_AREAS);
  private readonly categoriesSignal = signal<Category[]>(MOCK_CATEGORIES);
  private readonly placesSignal = signal<Place[]>(MOCK_PLACES);

  // Selected Discovery Journey State
  public readonly selectedDistrictId = signal<string>('coimbatore');
  public readonly selectedAreaId = signal<string | null>(null);
  public readonly selectedCategoryId = signal<string | null>(null);

  // Readonly data signals
  public readonly districts = this.districtsSignal.asReadonly();
  public readonly areas = this.areasSignal.asReadonly();
  public readonly categories = this.categoriesSignal.asReadonly();
  public readonly places = this.placesSignal.asReadonly();

  // Computed state for quick access
  public readonly currentDistrict = computed(() => {
    const id = this.selectedDistrictId();
    return this.districtsSignal().find((d) => d.id === id) || this.districtsSignal()[0];
  });

  public readonly areasForCurrentDistrict = computed(() => {
    const districtId = this.selectedDistrictId();
    return this.areasSignal().filter((a) => a.districtId === districtId);
  });

  public readonly featuredPlaces = computed(() => {
    return this.placesSignal().filter((p) => p.isFeatured);
  });

  public readonly trendingPlaces = computed(() => {
    return this.placesSignal().filter((p) => p.isTrending);
  });

  public readonly placeOfDay = computed(() => {
    return this.placesSignal().find((p) => p.isPlaceOfDay) || this.placesSignal()[0];
  });

  // Query Helpers
  public getDistrictById(id: string): District | undefined {
    return this.districtsSignal().find((d) => d.id.toLowerCase() === id.toLowerCase());
  }

  public getAreaById(id: string): Area | undefined {
    return this.areasSignal().find((a) => a.id.toLowerCase() === id.toLowerCase());
  }

  public getAreasByDistrict(districtId: string): Area[] {
    return this.areasSignal().filter((a) => a.districtId.toLowerCase() === districtId.toLowerCase());
  }

  public getCategoryById(id: string): Category | undefined {
    return this.categoriesSignal().find((c) => c.id.toLowerCase() === id.toLowerCase() || c.slug.toLowerCase() === id.toLowerCase());
  }

  public getPlaceBySlug(slug: string): Place | undefined {
    return this.placesSignal().find((p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase());
  }

  public getRelatedPlaces(currentPlace: Place, limit = 3): Place[] {
    return this.placesSignal()
      .filter((p) => p.id !== currentPlace.id && (p.districtId === currentPlace.districtId || p.categoryId === currentPlace.categoryId))
      .slice(0, limit);
  }

  public getPlacesByIds(ids: string[]): Place[] {
    return this.placesSignal().filter((p) => ids.includes(p.id));
  }

  public filterPlaces(filters: PlaceFilters): Place[] {
    let result = [...this.placesSignal()];

    if (filters.districtId && filters.districtId !== 'all') {
      result = result.filter((p) => p.districtId.toLowerCase() === filters.districtId!.toLowerCase());
    }

    if (filters.areaId && filters.areaId !== 'all') {
      result = result.filter((p) => p.areaId.toLowerCase() === filters.areaId!.toLowerCase());
    }

    if (filters.categoryId && filters.categoryId !== 'all') {
      result = result.filter((p) => p.categoryId.toLowerCase() === filters.categoryId!.toLowerCase());
    }

    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.areaName.toLowerCase().includes(q) ||
        p.districtName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    if (filters.minRating && filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    if (filters.priceLevels && filters.priceLevels.length > 0) {
      result = result.filter((p) => filters.priceLevels!.includes(p.priceLevel));
    }

    if (filters.openNowOnly) {
      result = result.filter((p) => p.isOpenNow);
    }

    if (filters.amenityIds && filters.amenityIds.length > 0) {
      result = result.filter((p) =>
        filters.amenityIds!.every((amenityId) =>
          p.amenities.some((a) => a.id.toLowerCase() === amenityId.toLowerCase())
        )
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recommended':
      default:
        // Featured and top rated first
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
        break;
    }

    return result;
  }
}
