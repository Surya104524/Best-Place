import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DiscoveryService } from '../../core/services/discovery.service';
import { BookmarkService } from '../../core/services/bookmark.service';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-saved-places',
  standalone: true,
  imports: [CommonModule, RouterLink, PlaceCardComponent, IconComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 min-h-screen">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
            <span>SAVED DOSSIERS</span>
          </div>
          <h1 class="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Curated Collection <span class="text-rose-400">({{ savedPlaces().length }})</span>
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 mt-1">
            Bookmarked sanctuaries, sunset viewpoints, and roasteries saved for your upcoming journeys.
          </p>
        </div>

        @if (savedPlaces().length > 0) {
          <button
            type="button"
            (click)="bookmarkService.clearAll()"
            class="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40 text-xs font-medium text-slate-400 hover:text-rose-300 transition-colors"
          >
            Clear All
          </button>
        }
      </div>

      <!-- Category Filter Tabs -->
      @if (savedPlaces().length > 0) {
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          <button
            type="button"
            (click)="selectedCategoryFilter.set('all')"
            class="px-4 py-1.5 rounded-full border font-medium transition-all"
            [class]="selectedCategoryFilter() === 'all'
              ? 'bg-purple-600 border-purple-500 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'"
          >
            All ({{ savedPlaces().length }})
          </button>

          @for (cat of categoriesWithSaved(); track cat.id) {
            <button
              type="button"
              (click)="selectedCategoryFilter.set(cat.id)"
              class="px-4 py-1.5 rounded-full border font-medium transition-all flex items-center gap-1.5"
              [class]="selectedCategoryFilter() === cat.id
                ? 'bg-purple-600 border-purple-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'"
            >
              <span>{{ cat.emoji }}</span>
              <span>{{ cat.name }}</span>
            </button>
          }
        </div>

        <!-- Grid of Saved Places -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (place of filteredSavedPlaces(); track place.id) {
            <app-place-card [place]="place"></app-place-card>
          }
        </div>
      } @else {
        <!-- Empty State -->
        <div class="text-center py-20 px-4 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4 max-w-lg mx-auto">
          <div class="w-16 h-16 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <app-icon name="heart" [size]="28"></app-icon>
          </div>
          <h3 class="font-display text-xl font-bold text-white">No Saved Places Yet</h3>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            As you explore roasteries, viewpoints, and hidden speakeasies, tap the heart icon to save them to your personal curated dossier.
          </p>
          <div class="pt-2">
            <a
              routerLink="/discover/districts"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg transition-all"
            >
              <app-icon name="compass" [size]="15"></app-icon>
              <span>Start Curated Journey</span>
            </a>
          </div>
        </div>
      }
    </div>
  `
})
export class SavedPlacesComponent {
  private readonly discoveryService = inject(DiscoveryService);
  public readonly bookmarkService = inject(BookmarkService);

  public selectedCategoryFilter = signal<string>('all');

  public readonly savedPlaces = computed(() => {
    const ids = this.bookmarkService.savedPlaceIds();
    return this.discoveryService.getPlacesByIds(ids);
  });

  public readonly categoriesWithSaved = computed(() => {
    const places = this.savedPlaces();
    const catIds = Array.from(new Set(places.map((p) => p.categoryId)));
    return this.discoveryService.categories().filter((c) => catIds.includes(c.id));
  });

  public readonly filteredSavedPlaces = computed(() => {
    const cat = this.selectedCategoryFilter();
    if (cat === 'all') return this.savedPlaces();
    return this.savedPlaces().filter((p) => p.categoryId === cat);
  });
}
