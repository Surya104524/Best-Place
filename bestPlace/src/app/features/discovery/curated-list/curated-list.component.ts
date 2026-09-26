import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscoveryService, PlaceFilters } from '../../../core/services/discovery.service';
import { BookmarkService } from '../../../core/services/bookmark.service';
import { Place } from '../../../core/models/place.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';
import { RatingBadgeComponent } from '../../../shared/components/rating-badge/rating-badge.component';
import { BreadcrumbStepperComponent, StepItem } from '../../../shared/components/breadcrumb-stepper/breadcrumb-stepper.component';

@Component({
  selector: 'app-curated-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, IconComponent, PlaceCardComponent, RatingBadgeComponent, BreadcrumbStepperComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 min-h-screen">
      <!-- Breadcrumb Stepper -->
      <app-breadcrumb-stepper [steps]="stepperItems()"></app-breadcrumb-stepper>

      <!-- Header & Active Filter Bar -->
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
              <span>STEP 04 OF 04 • CURATED DOSSIER LIST</span>
            </div>
            <h1 class="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated Places <span class="text-purple-400">({{ filteredPlaces().length }})</span>
            </h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-1">
              Hand-verified and ranked for {{ districtLabel() }} @if (areaLabel()) { • {{ areaLabel() }} } @if (categoryLabel()) { • {{ categoryLabel() }} }
            </p>
          </div>

          <!-- Controls: View Mode & Mobile Filter Trigger -->
          <div class="flex items-center gap-2.5">
            <!-- View Mode Switcher -->
            <div class="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                type="button"
                (click)="viewMode.set('grid')"
                class="p-2 rounded-lg transition-colors"
                [class]="viewMode() === 'grid' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'"
                aria-label="Grid view"
              >
                <app-icon name="grid" [size]="16"></app-icon>
              </button>
              <button
                type="button"
                (click)="viewMode.set('list')"
                class="p-2 rounded-lg transition-colors"
                [class]="viewMode() === 'list' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'"
                aria-label="List view"
              >
                <app-icon name="list" [size]="16"></app-icon>
              </button>
            </div>

            <!-- Sort Dropdown -->
            <select
              [ngModel]="sortBy()"
              (ngModelChange)="sortBy.set($event)"
              class="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="reviews">Sort: Most Reviewed</option>
              <option value="name">Sort: Name A-Z</option>
            </select>
          </div>
        </div>

        <!-- Filter Chips Bar -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <!-- Open Now Toggle -->
          <button
            type="button"
            (click)="openNowOnly.set(!openNowOnly())"
            class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
            [class]="openNowOnly()
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'"
          >
            <span class="w-1.5 h-1.5 rounded-full" [class]="openNowOnly() ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'"></span>
            <span>Open Now</span>
          </button>

          <!-- 4.8+ Rating Filter -->
          <button
            type="button"
            (click)="toggleMinRating(4.8)"
            class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
            [class]="minRating() === 4.8
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'"
          >
            <app-icon name="star" [size]="12" class="fill-amber-400 text-amber-400"></app-icon>
            <span>Top Rated (4.8+)</span>
          </button>

          <!-- Wi-Fi Amenity Filter -->
          <button
            type="button"
            (click)="toggleAmenity('wifi')"
            class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
            [class]="isAmenityActive('wifi')
              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'"
          >
            <app-icon name="wifi" [size]="12"></app-icon>
            <span>Fast Wi-Fi (100+ Mbps)</span>
          </button>

          <!-- Valet Parking Filter -->
          <button
            type="button"
            (click)="toggleAmenity('parking')"
            class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
            [class]="isAmenityActive('parking')
              ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'"
          >
            <app-icon name="car" [size]="12"></app-icon>
            <span>Valet Parking</span>
          </button>

          <!-- Price Reset Button -->
          @if (hasActiveFilters()) {
            <button
              type="button"
              (click)="resetFilters()"
              class="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-medium transition-colors"
            >
              <app-icon name="x" [size]="12"></app-icon>
              <span>Reset Filters</span>
            </button>
          }
        </div>
      </div>

      <!-- PLACES VIEW: GRID OR LIST -->
      @if (filteredPlaces().length > 0) {
        @if (viewMode() === 'grid') {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (place of filteredPlaces(); track place.id) {
              <app-place-card [place]="place"></app-place-card>
            }
          </div>
        } @else {
          <!-- Compact List View -->
          <div class="space-y-4">
            @for (place of filteredPlaces(); track place.id) {
              <div
                class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all group"
              >
                <img
                  [src]="place.heroImage"
                  [alt]="place.name"
                  class="w-full sm:w-44 h-36 rounded-xl object-cover flex-shrink-0"
                />
                <div class="flex-grow min-w-0 flex flex-col justify-between gap-2">
                  <div>
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="text-base">{{ place.categoryEmoji }}</span>
                        <a
                          [routerLink]="['/places', place.slug]"
                          class="font-display font-bold text-lg text-white group-hover:text-purple-300 transition-colors"
                        >
                          {{ place.name }}
                        </a>
                      </div>
                      <app-rating-badge [rating]="place.rating" [reviewCount]="place.reviewCount"></app-rating-badge>
                    </div>

                    <div class="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span class="text-purple-300 font-medium">{{ place.areaName }}, {{ place.districtName }}</span>
                      <span>•</span>
                      <span class="font-mono text-slate-300">{{ place.priceLevel }}</span>
                      <span>•</span>
                      <span [class]="place.isOpenNow ? 'text-emerald-400 font-medium' : 'text-slate-500'">
                        {{ place.isOpenNow ? 'Open Now' : 'Closed' }}
                      </span>
                    </div>

                    <p class="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {{ place.tagline }}
                    </p>
                  </div>

                  <div class="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <span class="text-cyan-300 text-[11px] truncate">
                      ⚡ {{ place.insights.wifi.label }}
                    </span>
                    <a
                      [routerLink]="['/places', place.slug]"
                      class="px-3.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1 flex-shrink-0"
                    >
                      <span>Explore Dossier</span>
                      <app-icon name="chevron-right" [size]="13"></app-icon>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      } @else {
        <!-- Empty State -->
        <div class="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800">
          <div class="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-purple-400 mb-4">
            <app-icon name="compass" [size]="28"></app-icon>
          </div>
          <h3 class="font-display text-xl font-bold text-white">No places match this combination</h3>
          <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your active filters or exploring other areas in {{ districtLabel() }}.
          </p>
          <button
            type="button"
            (click)="resetFilters()"
            class="mt-6 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      }
    </div>
  `
})
export class CuratedListComponent implements OnInit {
  private readonly discoveryService = inject(DiscoveryService);
  private readonly route = inject(ActivatedRoute);

  public districtId = signal<string>('coimbatore');
  public areaId = signal<string | null>(null);
  public categoryId = signal<string | null>(null);
  public searchQuery = signal<string>('');

  public viewMode = signal<'grid' | 'list'>('grid');
  public sortBy = signal<'recommended' | 'rating' | 'reviews' | 'name'>('recommended');
  public openNowOnly = signal<boolean>(false);
  public minRating = signal<number>(0);
  public activeAmenityIds = signal<string[]>([]);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['district']) this.districtId.set(params['district']);
      if (params['area'] && params['area'] !== 'all') this.areaId.set(params['area']);
      else this.areaId.set(null);
      if (params['category'] && params['category'] !== 'all') this.categoryId.set(params['category']);
      else this.categoryId.set(null);
      if (params['q']) this.searchQuery.set(params['q']);
    });
  }

  public readonly district = computed(() => {
    return this.discoveryService.getDistrictById(this.districtId()) || this.discoveryService.districts()[0];
  });

  public readonly area = computed(() => {
    return this.areaId() ? this.discoveryService.getAreaById(this.areaId()!) : null;
  });

  public readonly category = computed(() => {
    return this.categoryId() ? this.discoveryService.getCategoryById(this.categoryId()!) : null;
  });

  public readonly districtLabel = computed(() => this.district()?.name || 'All Districts');
  public readonly areaLabel = computed(() => this.area()?.name || null);
  public readonly categoryLabel = computed(() => this.category()?.name || null);

  public readonly stepperItems = computed<StepItem[]>(() => {
    const dId = this.districtId();
    const aId = this.areaId() || 'all';
    return [
      {
        stepNumber: 1,
        label: 'District',
        sublabel: this.district()?.name,
        route: ['/discover/districts'],
        isCompleted: true,
        isActive: false
      },
      {
        stepNumber: 2,
        label: 'Area',
        sublabel: this.area()?.name || 'All',
        route: ['/discover/areas'],
        queryParams: { district: dId },
        isCompleted: true,
        isActive: false
      },
      {
        stepNumber: 3,
        label: 'Category',
        sublabel: this.category()?.name || 'All',
        route: ['/discover/categories'],
        queryParams: { district: dId, area: aId },
        isCompleted: true,
        isActive: false
      },
      {
        stepNumber: 4,
        label: 'Curated Places',
        sublabel: `${this.filteredPlaces().length} Spots`,
        isCompleted: false,
        isActive: true
      }
    ];
  });

  public readonly filteredPlaces = computed<Place[]>(() => {
    const filters: PlaceFilters = {
      districtId: this.districtId(),
      areaId: this.areaId() || undefined,
      categoryId: this.categoryId() || undefined,
      searchQuery: this.searchQuery(),
      minRating: this.minRating(),
      openNowOnly: this.openNowOnly(),
      amenityIds: this.activeAmenityIds(),
      sortBy: this.sortBy()
    };
    return this.discoveryService.filterPlaces(filters);
  });

  public toggleMinRating(rating: number): void {
    this.minRating.set(this.minRating() === rating ? 0 : rating);
  }

  public isAmenityActive(id: string): boolean {
    return this.activeAmenityIds().includes(id);
  }

  public toggleAmenity(id: string): void {
    this.activeAmenityIds.update((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  }

  public hasActiveFilters(): boolean {
    return this.openNowOnly() || this.minRating() > 0 || this.activeAmenityIds().length > 0 || !!this.searchQuery();
  }

  public resetFilters(): void {
    this.openNowOnly.set(false);
    this.minRating.set(0);
    this.activeAmenityIds.set([]);
    this.searchQuery.set('');
  }
}
