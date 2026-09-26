import { Injectable, signal, effect, inject } from '@angular/core';
import { ToastService } from './toast.service';

const STORAGE_KEY = 'best_place_saved_ids';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private readonly toast = inject(ToastService);
  private readonly savedPlaceIdsSignal = signal<string[]>(this.loadSavedIds());
  public readonly savedPlaceIds = this.savedPlaceIdsSignal.asReadonly();

  constructor() {
    effect(() => {
      const ids = this.savedPlaceIdsSignal();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      } catch (err) {
        console.warn('Could not save bookmarks to localStorage', err);
      }
    });
  }

  private loadSavedIds(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['quantum-coffee-lab', 'horizon-sky-deck'];
    } catch {
      return ['quantum-coffee-lab', 'horizon-sky-deck'];
    }
  }

  public isSaved(placeId: string): boolean {
    return this.savedPlaceIdsSignal().includes(placeId);
  }

  public toggleSave(placeId: string, placeName?: string): boolean {
    const isCurrentlySaved = this.isSaved(placeId);
    if (isCurrentlySaved) {
      this.savedPlaceIdsSignal.update((ids) => ids.filter((id) => id !== placeId));
      this.toast.info('Removed from Saved Places', placeName ? `Removed ${placeName}` : undefined);
      return false;
    } else {
      this.savedPlaceIdsSignal.update((ids) => [placeId, ...ids]);
      this.toast.success('Saved to Your Dossier', placeName ? `${placeName} is now in your saved list.` : undefined);
      return true;
    }
  }

  public removeSaved(placeId: string): void {
    this.savedPlaceIdsSignal.update((ids) => ids.filter((id) => id !== placeId));
    this.toast.info('Removed from Saved Places');
  }

  public clearAll(): void {
    this.savedPlaceIdsSignal.set([]);
    this.toast.info('Saved places cleared');
  }
}
