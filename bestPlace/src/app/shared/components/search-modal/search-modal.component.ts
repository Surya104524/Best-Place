import { Component, signal, computed, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscoveryService } from '../../../core/services/discovery.service';
import { IconComponent } from '../icon/icon.component';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, RatingBadgeComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20 bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
      (click)="onBackdropClick($event)"
    >
      <div
        class="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-in"
      >
        <!-- Search Input Bar -->
        <div class="relative flex items-center px-5 py-4 border-b border-slate-800 bg-slate-950/50">
          <app-icon name="search" [size]="20" class="text-purple-400 mr-3 flex-shrink-0 animate-pulse"></app-icon>
          <input
            type="text"
            [ngModel]="query()"
            (ngModelChange)="query.set($event)"
            placeholder="Search places, vibes, coffees, sunsets, fine dining..."
            autofocus
            class="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base sm:text-lg focus:outline-none"
          />
          @if (query()) {
            <button
              type="button"
              (click)="query.set('')"
              class="p-1 rounded-full text-slate-400 hover:text-white mr-2 hover:scale-110 active:scale-90 transition-transform"
            >
              <app-icon name="x" [size]="16"></app-icon>
            </button>
          }
          <button
            type="button"
            (click)="close.emit()"
            class="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95 transition-all"
          >
            ESC
          </button>
        </div>

        <!-- Quick Filter Pills -->
        <div class="px-5 py-2.5 bg-slate-950/30 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span class="text-slate-500 font-medium flex-shrink-0">Quick Vibe:</span>
          @for (cat of categories(); track cat.id) {
            <button
              type="button"
              (click)="query.set(cat.name)"
              class="flex-shrink-0 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-purple-900/40 text-slate-300 hover:text-purple-300 transition-all border border-slate-700/50 hover:scale-105 active:scale-95"
            >
              {{ cat.emoji }} {{ cat.name }}
            </button>
          }
        </div>

        <!-- Results Area -->
        <div class="flex-grow overflow-y-auto p-4 sm:p-5 space-y-5">
          <!-- Places Match -->
          @if (matchedPlaces().length > 0) {
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2.5 px-2">
                Curated Places ({{ matchedPlaces().length }})
              </div>
              <div class="space-y-1.5">
                @for (place of matchedPlaces(); track place.id) {
                  <div
                    (click)="goToPlace(place.slug)"
                    class="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl hover:bg-slate-800/80 cursor-pointer transition-all group border border-transparent hover:border-purple-500/20 hover:translate-x-1"
                  >
                    <img
                      [src]="place.heroImage"
                      [alt]="place.name"
                      class="w-12 h-12 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div class="flex-grow min-w-0">
                      <div class="flex items-center justify-between gap-2">
                        <h5 class="text-sm font-semibold text-slate-100 group-hover:text-purple-300 transition-colors truncate">
                          {{ place.name }}
                        </h5>
                        <app-rating-badge [rating]="place.rating"></app-rating-badge>
                      </div>
                      <div class="flex items-center gap-2 text-xs text-slate-400 mt-0.5 truncate">
                        <span>{{ place.categoryEmoji }} {{ place.categoryName }}</span>
                        <span>•</span>
                        <span class="text-purple-400">{{ place.areaName }}, {{ place.districtName }}</span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Districts Match -->
          @if (matchedDistricts().length > 0) {
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5 px-2">
                Districts ({{ matchedDistricts().length }})
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                @for (district of matchedDistricts(); track district.id) {
                  <div
                    (click)="goToDistrict(district.id)"
                    class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 hover:bg-slate-800 border border-slate-800 cursor-pointer transition-all group hover:scale-[1.02]"
                  >
                    <img
                      [src]="district.image"
                      [alt]="district.name"
                      class="w-10 h-10 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div class="min-w-0">
                      <div class="text-sm font-medium text-slate-200 group-hover:text-cyan-300 truncate">
                        {{ district.name }}
                      </div>
                      <div class="text-xs text-slate-400">{{ district.curatedPlacesCount }} Curated Places</div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Areas Match -->
          @if (matchedAreas().length > 0) {
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 px-2">
                Areas & Sectors ({{ matchedAreas().length }})
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                @for (area of matchedAreas(); track area.id) {
                  <div
                    (click)="goToArea(area.districtId, area.id)"
                    class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 hover:bg-slate-800 border border-slate-800 cursor-pointer transition-all group hover:scale-[1.02]"
                  >
                    <img
                      [src]="area.image"
                      [alt]="area.name"
                      class="w-10 h-10 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div class="min-w-0">
                      <div class="text-sm font-medium text-slate-200 group-hover:text-emerald-300 truncate">
                        {{ area.name }}
                      </div>
                      <div class="text-xs text-slate-400">{{ area.curatedPlacesCount }} Curated Places</div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Empty State -->
          @if (query() && matchedPlaces().length === 0 && matchedDistricts().length === 0 && matchedAreas().length === 0) {
            <div class="text-center py-12 px-4 animate-fade-in-up">
              <div class="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <app-icon name="search" [size]="20"></app-icon>
              </div>
              <h4 class="text-base font-semibold text-slate-200">No matching curated places found</h4>
              <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching for “Coffee”, “Rooftop”, “Sunset”, “Race Course”, or “Coimbatore”.
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class SearchModalComponent {
  public readonly close = output<void>();
  public readonly query = signal<string>('');

  private readonly discoveryService = inject(DiscoveryService);
  private readonly router = inject(Router);

  public readonly categories = this.discoveryService.categories;

  public readonly matchedPlaces = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.discoveryService.places().slice(0, 5);
    return this.discoveryService.places().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.areaName.toLowerCase().includes(q) ||
        p.districtName.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  public readonly matchedDistricts = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return [];
    return this.discoveryService.districts().filter(
      (d) => d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q)
    );
  });

  public readonly matchedAreas = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return [];
    return this.discoveryService.areas().filter(
      (a) => a.name.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q) || a.vibe.toLowerCase().includes(q)
    );
  });

  public onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('backdrop-blur-xl')) {
      this.close.emit();
    }
  }

  public goToPlace(slug: string): void {
    this.close.emit();
    this.router.navigate(['/places', slug]);
  }

  public goToDistrict(districtId: string): void {
    this.close.emit();
    this.router.navigate(['/discover/areas'], { queryParams: { district: districtId } });
  }

  public goToArea(districtId: string, areaId: string): void {
    this.close.emit();
    this.router.navigate(['/discover/categories'], { queryParams: { district: districtId, area: areaId } });
  }
}
