import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscoveryService } from '../../core/services/discovery.service';
import { Place } from '../../core/models/place.model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RatingBadgeComponent } from '../../shared/components/rating-badge/rating-badge.component';

@Component({
  selector: 'app-map-explore',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, IconComponent, RatingBadgeComponent],
  template: `
    <div class="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden bg-[#070b14] flex flex-col">
      <!-- TOP MAP CONTROLS BAR -->
      <div class="absolute top-4 inset-x-4 z-20 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        <!-- District Picker -->
        <div class="pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl">
          <app-icon name="map-pin" [size]="16" class="text-purple-400 ml-2"></app-icon>
          <select
            [ngModel]="selectedDistrictId()"
            (ngModelChange)="selectedDistrictId.set($event)"
            class="bg-transparent text-xs font-bold text-white focus:outline-none pr-3 py-1 cursor-pointer"
          >
            @for (dist of districts(); track dist.id) {
              <option [value]="dist.id" class="bg-slate-900 text-white">{{ dist.name }} ({{ dist.curatedPlacesCount }})</option>
            }
          </select>
        </div>

        <!-- Category Filter Pills -->
        <div class="pointer-events-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 max-w-full text-xs">
          <button
            type="button"
            (click)="selectedCategory.set('all')"
            class="px-3 py-1 rounded-xl transition-all"
            [class]="selectedCategory() === 'all' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'"
          >
            All
          </button>
          @for (cat of categories(); track cat.id) {
            <button
              type="button"
              (click)="selectedCategory.set(cat.id)"
              class="px-3 py-1 rounded-xl transition-all flex items-center gap-1 flex-shrink-0"
              [class]="selectedCategory() === cat.id ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'"
            >
              <span>{{ cat.emoji }}</span>
              <span>{{ cat.name }}</span>
            </button>
          }
        </div>
      </div>

      <!-- MAP CANVAS SIMULATION -->
      <div class="relative w-full h-full bg-[#090d16] flex items-center justify-center select-none overflow-hidden">
        <!-- SVG Stylized Topography & Roads Layer -->
        <svg class="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <!-- Grid Lines -->
          <defs>
            <pattern id="map-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />

          <!-- Simulated Rivers & Green Belts -->
          <path d="M 0,300 Q 400,200 800,450 T 1600,400" fill="none" stroke="rgba(6, 182, 212, 0.25)" stroke-width="12" />
          <path d="M 200,0 Q 450,400 700,900" fill="none" stroke="rgba(139, 92, 246, 0.15)" stroke-width="8" />
          <path d="M 0,600 Q 600,650 1200,800" fill="none" stroke="rgba(16, 185, 129, 0.15)" stroke-width="16" />
          <circle cx="35%" cy="45%" r="180" fill="rgba(139, 92, 246, 0.04)" />
          <circle cx="70%" cy="60%" r="220" fill="rgba(6, 182, 212, 0.04)" />
        </svg>

        <!-- Simulated Coordinate Radar Sweep -->
        <div class="absolute inset-0 bg-gradient-to-tr from-purple-950/10 via-transparent to-cyan-950/10 pointer-events-none"></div>

        <!-- INTERACTIVE PINS -->
        <div class="relative w-full h-full max-w-6xl max-h-[700px] pointer-events-auto">
          @for (place of placesInDistrict(); track place.id; let idx = $index) {
            <div
              (click)="selectedPlace.set(place)"
              class="absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group"
              [style.top]="getPinTop(idx)"
              [style.left]="getPinLeft(idx)"
            >
              <!-- Pin Pulse -->
              <div
                class="relative flex items-center justify-center"
                [class.scale-125]="selectedPlace()?.id === place.id"
              >
                <div
                  class="absolute w-10 h-10 rounded-full animate-ping opacity-30"
                  [class]="getPinColorClass(place.categoryId)"
                ></div>
                
                <!-- Pin Body -->
                <div
                  class="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-2xl backdrop-blur-md transition-all group-hover:scale-110"
                  [class]="selectedPlace()?.id === place.id
                    ? 'bg-purple-600 border-white text-white shadow-[0_0_25px_rgba(147,51,234,0.7)] ring-2 ring-purple-400'
                    : 'bg-slate-900/90 border-slate-700 text-slate-200 group-hover:border-purple-500'"
                >
                  <span class="text-sm">{{ place.categoryEmoji }}</span>
                  <span class="text-xs font-bold whitespace-nowrap">{{ place.name }}</span>
                  <span class="text-[10px] text-amber-300 font-semibold">★{{ place.rating.toFixed(1) }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- FLOATING PLACE PREVIEW CARD -->
      @if (selectedPlace(); as sel) {
        <div class="absolute bottom-20 md:bottom-8 inset-x-4 z-30 max-w-lg mx-auto animate-in slide-in-from-bottom-5 duration-200">
          <div class="p-4 sm:p-5 rounded-3xl bg-slate-900/95 border border-purple-500/40 backdrop-blur-2xl shadow-2xl flex items-center gap-4">
            <img
              [src]="sel.heroImage"
              [alt]="sel.name"
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover flex-shrink-0 border border-white/10"
            />
            
            <div class="flex-grow min-w-0 space-y-1.5">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <span>{{ sel.categoryEmoji }}</span>
                  <h4 class="text-sm sm:text-base font-bold text-white truncate">{{ sel.name }}</h4>
                </div>
                <button
                  type="button"
                  (click)="selectedPlace.set(null)"
                  class="text-slate-400 hover:text-white p-1"
                >
                  <app-icon name="x" [size]="14"></app-icon>
                </button>
              </div>

              <div class="flex items-center gap-2 text-xs text-slate-400">
                <app-rating-badge [rating]="sel.rating"></app-rating-badge>
                <span>•</span>
                <span class="text-purple-300">{{ sel.areaName }}</span>
              </div>

              <div class="pt-1 flex items-center gap-2">
                <a
                  [routerLink]="['/places', sel.slug]"
                  class="flex-grow py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold text-center transition-colors shadow-md"
                >
                  View Dossier
                </a>
                <a
                  [href]="'https://www.google.com/maps/search/?api=1&query=' + sel.name + ' ' + sel.address"
                  target="_blank"
                  rel="noopener"
                  class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                  aria-label="Directions"
                >
                  <app-icon name="map-pin" [size]="15"></app-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class MapExploreComponent {
  private readonly discoveryService = inject(DiscoveryService);

  public readonly districts = this.discoveryService.districts;
  public readonly categories = this.discoveryService.categories;

  public selectedDistrictId = signal<string>('coimbatore');
  public selectedCategory = signal<string>('all');
  public selectedPlace = signal<Place | null>(this.discoveryService.places()[0] || null);

  public readonly placesInDistrict = computed(() => {
    const dId = this.selectedDistrictId();
    const cat = this.selectedCategory();
    let list = this.discoveryService.places().filter((p) => p.districtId === dId);
    if (list.length === 0) list = this.discoveryService.places();
    if (cat !== 'all') list = list.filter((p) => p.categoryId === cat);
    return list;
  });

  public getPinTop(idx: number): string {
    const tops = ['28%', '42%', '58%', '34%', '68%', '48%'];
    return tops[idx % tops.length];
  }

  public getPinLeft(idx: number): string {
    const lefts = ['24%', '52%', '32%', '74%', '62%', '82%'];
    return lefts[idx % lefts.length];
  }

  public getPinColorClass(catId: string): string {
    switch (catId) {
      case 'cafes': return 'bg-amber-500';
      case 'rooftops': return 'bg-purple-500';
      case 'viewpoints': return 'bg-cyan-500';
      case 'hidden-gems': return 'bg-pink-500';
      case 'fine-dining': return 'bg-emerald-500';
      default: return 'bg-indigo-500';
    }
  }
}
