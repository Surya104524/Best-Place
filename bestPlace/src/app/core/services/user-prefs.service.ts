import { Injectable, signal, effect } from '@angular/core';

const RECENT_KEY = 'best_place_recent_ids';
const USER_DISTRICT_KEY = 'best_place_default_district';

export interface UserPreferences {
  defaultDistrictId: string;
  preferredVibe: string;
  dietaryPreference: string;
  notificationsEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserPrefsService {
  private readonly recentPlaceIdsSignal = signal<string[]>(this.loadRecentIds());
  public readonly recentPlaceIds = this.recentPlaceIdsSignal.asReadonly();

  public readonly defaultDistrictId = signal<string>(
    localStorage.getItem(USER_DISTRICT_KEY) || 'coimbatore'
  );

  public readonly preferences = signal<UserPreferences>({
    defaultDistrictId: 'coimbatore',
    preferredVibe: 'Specialty Coffee & Sunset Views',
    dietaryPreference: 'All / Organic',
    notificationsEnabled: true
  });

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(this.recentPlaceIdsSignal()));
      } catch (e) {
        console.warn(e);
      }
    });

    effect(() => {
      try {
        localStorage.setItem(USER_DISTRICT_KEY, this.defaultDistrictId());
      } catch (e) {
        console.warn(e);
      }
    });
  }

  private loadRecentIds(): string[] {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      return stored ? JSON.parse(stored) : ['solarium-botanical-bistro', 'mistwood-observatory'];
    } catch {
      return ['solarium-botanical-bistro', 'mistwood-observatory'];
    }
  }

  public recordView(placeId: string): void {
    this.recentPlaceIdsSignal.update((ids) => {
      const filtered = ids.filter((id) => id !== placeId);
      return [placeId, ...filtered].slice(0, 8);
    });
  }

  public clearRecent(): void {
    this.recentPlaceIdsSignal.set([]);
  }

  public setDefaultDistrict(districtId: string): void {
    this.defaultDistrictId.set(districtId);
  }
}
