import { Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Place } from '../../../core/models/place.model';
import { BookmarkService } from '../../../core/services/bookmark.service';
import { IconComponent } from '../icon/icon.component';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent, RatingBadgeComponent],
  template: `
    <div
      class="group relative flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800/80 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/40 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.22)] animate-fade-in-up"
      [class.opacity-90]="!place().isOpenNow"
    >
      <!-- Media Header -->
      <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          [src]="place().heroImage"
          [alt]="place().name"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        <!-- Top Badges -->
        <div class="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
          <!-- Category & Badge -->
          <div class="flex items-center gap-1.5 pointer-events-auto">
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 shadow-sm transition-transform group-hover:scale-105">
              <span>{{ place().categoryEmoji }}</span>
              <span>{{ place().categoryName }}</span>
            </span>

            @if (place().badge) {
              <span class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-600/90 text-white text-[11px] font-semibold shadow-sm backdrop-blur-md">
                {{ place().badge }}
              </span>
            }
          </div>

          <!-- Bookmark Toggle Button with Micro-Animation -->
          <button
            type="button"
            (click)="onToggleBookmark($event)"
            class="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 hover:scale-110 active:scale-90 shadow-lg"
            [class.animate-heart-bounce]="justToggled()"
            [attr.aria-label]="isSaved() ? 'Remove from saved' : 'Save place'"
          >
            <app-icon
              name="heart"
              [size]="17"
              [class]="isSaved() ? 'fill-rose-500 text-rose-500' : 'text-slate-300'"
            ></app-icon>
          </button>
        </div>

        <!-- Bottom overlay stats -->
        <div class="absolute bottom-3 inset-x-3.5 flex items-center justify-between text-xs pointer-events-none">
          <!-- Open / Closed Badge -->
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-xs font-medium transition-colors"
            [class]="place().isOpenNow ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' : 'bg-slate-900/80 border-slate-700 text-slate-400'">
            <span class="w-1.5 h-1.5 rounded-full" [class]="place().isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'"></span>
            <span>{{ place().isOpenNow ? 'Open Now' : 'Closed' }}</span>
          </div>

          <!-- Price Level -->
          <span class="px-2.5 py-0.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-white/10 text-slate-300 font-mono font-medium">
            {{ place().priceLevel }}
          </span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          <!-- Title & Rating -->
          <div class="flex items-start justify-between gap-2">
            <a
              [routerLink]="['/places', place().slug]"
              class="font-display font-semibold text-lg sm:text-xl text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1"
            >
              {{ place().name }}
            </a>
            <app-rating-badge [rating]="place().rating" [reviewCount]="place().reviewCount"></app-rating-badge>
          </div>

          <!-- Location & Tagline -->
          <div class="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-2">
            <app-icon name="map-pin" [size]="13" class="text-purple-400 flex-shrink-0"></app-icon>
            <span class="font-medium text-slate-300">{{ place().areaName }}</span>
            <span>•</span>
            <span>{{ place().districtName }}</span>
          </div>

          <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {{ place().tagline }}
          </p>
        </div>

        <!-- Curated Smart Insights Highlight -->
        <div class="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
          <!-- Quick Insight Snippet -->
          <div class="flex items-center gap-1.5 text-slate-300 min-w-0">
            @if (place().insights.wifi.workScore >= 9.0) {
              <span class="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 animate-pulse"></span>
              <span class="truncate text-[11px] text-cyan-200">⚡ {{ place().insights.wifi.speedMbps }} Mbps Wi-Fi</span>
            } @else if (place().insights.crowdLevel.status === 'low') {
              <span class="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse"></span>
              <span class="truncate text-[11px] text-emerald-200">🟢 Low Crowd Vibe</span>
            } @else {
              <span class="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 animate-pulse"></span>
              <span class="truncate text-[11px] text-amber-200">🌅 Best: {{ place().insights.bestTime.slot }}</span>
            }
          </div>

          <!-- Action Link -->
          <a
            [routerLink]="['/places', place().slug]"
            class="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all flex-shrink-0"
          >
            <span>Dossier</span>
            <app-icon name="chevron-right" [size]="13"></app-icon>
          </a>
        </div>
      </div>
    </div>
  `
})
export class PlaceCardComponent {
  place = input.required<Place>();
  private readonly bookmarkService = inject(BookmarkService);

  public justToggled = signal<boolean>(false);

  public isSaved(): boolean {
    return this.bookmarkService.isSaved(this.place().id);
  }

  public onToggleBookmark(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.bookmarkService.toggleSave(this.place().id, this.place().name);
    this.justToggled.set(true);
    setTimeout(() => this.justToggled.set(false), 500);
  }
}
