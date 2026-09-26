import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscoveryService } from '../../core/services/discovery.service';
import { UserPrefsService } from '../../core/services/user-prefs.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';
import { RatingBadgeComponent } from '../../shared/components/rating-badge/rating-badge.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, IconComponent, PlaceCardComponent, RatingBadgeComponent],
  template: `
    <div class="min-h-screen pb-20">
      <!-- HERO SECTION -->
      <section class="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <!-- Ambient Hero Background with Dynamic Glow -->
        <div class="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background"
            class="w-full h-full object-cover opacity-20 filter blur-[2px] scale-105 transition-transform duration-1000"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-[#070b14]/70 via-[#070b14]/90 to-[#070b14]"></div>
          <!-- Decorative Glow Orbs -->
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-ambient-glow"></div>
          <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-ambient-glow delay-300"></div>
        </div>

        <div class="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in-up">
          <!-- Top Location-Aware Pill -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-xs text-slate-200 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all hover:scale-105">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hyperlocal Curation in</span>
            <a routerLink="/discover/districts" class="font-bold text-purple-300 hover:text-purple-200 underline decoration-purple-500/50">
              {{ currentDistrict().name }}
            </a>
            <span class="text-slate-500">•</span>
            <span class="text-slate-400">{{ currentDistrict().curatedPlacesCount }} Verified Spots</span>
          </div>

          <!-- Hero Headline -->
          <div class="space-y-3">
            <h1 class="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Discover the <span class="gradient-text-purple-cyan">Best.</span><br />
              Experience the <span class="gradient-text-gold">Best.</span>
            </h1>
            <p class="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              No endless searching or mediocre listings. Just strictly verified cafés, rooftops, scenic viewpoints, and hidden sanctuaries.
            </p>
          </div>

          <!-- Quick Discovery Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
              <app-icon name="search" [size]="20" class="text-purple-400 ml-3 flex-shrink-0"></app-icon>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (keyup.enter)="onSearch()"
                placeholder="Search specialty coffee, sunset decks, hidden gems..."
                class="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                (click)="onSearch()"
                class="flex-shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] flex items-center gap-1.5 hover:scale-105 active:scale-95"
              >
                <span>Explore</span>
                <app-icon name="arrow-right" [size]="14"></app-icon>
              </button>
            </div>
          </div>

          <!-- Step-by-Step Discovery Wizard CTA Banner -->
          <div class="pt-2">
            <a
              routerLink="/discover/districts"
              class="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-950/60 hover:bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 text-xs sm:text-sm text-slate-300 hover:text-white transition-all group backdrop-blur-md hover:scale-105"
            >
              <span class="w-6 h-6 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-xs font-bold">1</span>
              <span>Start 4-Step Curated Journey: <strong>District → Area → Category → Places</strong></span>
              <app-icon name="chevron-right" [size]="15" class="text-purple-400 group-hover:translate-x-1 transition-transform"></app-icon>
            </a>
          </div>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <!-- POPULAR CATEGORIES / VIBES PILL CAROUSEL -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-purple-400">Step Into a Vibe</div>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">Explore by Category</h2>
            </div>
            <a
              routerLink="/discover/categories"
              class="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span>View All Vibes</span>
              <app-icon name="chevron-right" [size]="14" class="group-hover:translate-x-0.5 transition-transform"></app-icon>
            </a>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            @for (cat of categories(); track cat.id) {
              <a
                [routerLink]="['/places']"
                [queryParams]="{ district: currentDistrict().id, category: cat.id }"
                class="group relative flex flex-col p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(139,92,246,0.25)]"
              >
                <div class="text-3xl mb-3 transform group-hover:scale-115 transition-transform duration-300">
                  {{ cat.emoji }}
                </div>
                <div class="font-display font-semibold text-sm text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                  {{ cat.name }}
                </div>
                <div class="text-xs text-slate-400 mt-1 font-mono">
                  {{ cat.curatedPlacesCount }} spots
                </div>
              </a>
            }
          </div>
        </section>

        <!-- PLACE OF THE DAY HIGHLIGHT -->
        @if (placeOfDay(); as pod) {
          <section class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/40 border border-purple-500/30 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-15px_rgba(147,51,234,0.25)] animate-fade-in-up">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-7 space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-semibold">
                  <app-icon name="sparkles" [size]="13"></app-icon>
                  <span>Curator's Handpicked Place of the Day</span>
                </div>

                <h3 class="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {{ pod.name }}
                </h3>

                <div class="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                  <app-rating-badge [rating]="pod.rating" [reviewCount]="pod.reviewCount"></app-rating-badge>
                  <span class="text-slate-500">•</span>
                  <span>{{ pod.categoryEmoji }} {{ pod.categoryName }}</span>
                  <span class="text-slate-500">•</span>
                  <span class="text-purple-300 font-medium">{{ pod.areaName }}, {{ pod.districtName }}</span>
                </div>

                <p class="text-sm text-slate-300 leading-relaxed max-w-xl">
                  {{ pod.description }}
                </p>

                <!-- Smart Insight Snippet -->
                <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <app-icon name="zap" [size]="16"></app-icon>
                  </div>
                  <div class="text-xs">
                    <span class="font-semibold text-cyan-300">Curator Tip: </span>
                    <span class="text-slate-300">{{ pod.insights.aiRecommendation }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-3 pt-2">
                  <a
                    [routerLink]="['/places', pod.slug]"
                    class="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <span>View Complete Dossier</span>
                    <app-icon name="chevron-right" [size]="14"></app-icon>
                  </a>
                </div>
              </div>

              <!-- Media Preview with Floating Animation -->
              <div class="lg:col-span-5">
                <div class="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl group animate-gentle-float">
                  <img
                    [src]="pod.heroImage"
                    [alt]="pod.name"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div class="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                    <span class="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-md">
                      ⚡ {{ pod.insights.wifi.speedMbps }} Mbps Wi-Fi
                    </span>
                    <span class="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-md">
                      🔈 {{ pod.insights.noiseLevel.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }

        <!-- TRENDING CURATED PLACES -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-purple-400">Verified & Trending</div>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                Trending in {{ currentDistrict().name }}
              </h2>
            </div>
            <a
              [routerLink]="['/places']"
              [queryParams]="{ district: currentDistrict().id }"
              class="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span>View All ({{ currentDistrict().curatedPlacesCount }})</span>
              <app-icon name="chevron-right" [size]="14" class="group-hover:translate-x-0.5 transition-transform"></app-icon>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (place of trendingPlaces(); track place.id) {
              <app-place-card [place]="place"></app-place-card>
            }
          </div>
        </section>

        <!-- CURATED COLLECTIONS -->
        <section class="space-y-6">
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-cyan-400">Editorial Lists</div>
            <h2 class="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
              Curated Collections
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <!-- Card 1 -->
            <a
              [routerLink]="['/places']"
              [queryParams]="{ category: 'cafes' }"
              class="group relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-800 p-6 flex flex-col justify-end transition-all hover:border-purple-500/40 hover:-translate-y-1.5 shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                alt="Work Friendly Roasteries"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
              <div class="relative z-10 space-y-1">
                <span class="text-xs font-bold text-purple-400 uppercase tracking-wider">Remote Work Edition</span>
                <h3 class="font-display text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  Top 5 Micro-Roasteries with 100+ Mbps Fiber
                </h3>
              </div>
            </a>

            <!-- Card 2 -->
            <a
              [routerLink]="['/places']"
              [queryParams]="{ category: 'rooftops' }"
              class="group relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-800 p-6 flex flex-col justify-end transition-all hover:border-purple-500/40 hover:-translate-y-1.5 shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
                alt="Sunset Decks"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
              <div class="relative z-10 space-y-1">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Golden Hour Guides</span>
                <h3 class="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Best Panoramic Sunset Rooftops in Tamil Nadu
                </h3>
              </div>
            </a>

            <!-- Card 3 -->
            <a
              [routerLink]="['/places']"
              [queryParams]="{ category: 'hidden-gems' }"
              class="group relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-800 p-6 flex flex-col justify-end transition-all hover:border-purple-500/40 hover:-translate-y-1.5 shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                alt="Secret Gems"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
              <div class="relative z-10 space-y-1">
                <span class="text-xs font-bold text-pink-400 uppercase tracking-wider">Secret Passport</span>
                <h3 class="font-display text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                  Hidden Courtyards & Concealed Speakeasies
                </h3>
              </div>
            </a>
          </div>
        </section>

        <!-- RECENTLY VIEWED PLACES -->
        @if (recentlyViewedPlaces().length > 0) {
          <section class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Continue Exploring</div>
                <h2 class="font-display text-2xl font-bold text-white mt-0.5">Recently Viewed</h2>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (place of recentlyViewedPlaces(); track place.id) {
                <app-place-card [place]="place"></app-place-card>
              }
            </div>
          </section>
        }
      </div>
    </div>
  `
})
export class HomeComponent {
  private readonly discoveryService = inject(DiscoveryService);
  private readonly userPrefsService = inject(UserPrefsService);
  private readonly router = inject(Router);

  public searchQuery = '';

  public readonly currentDistrict = this.discoveryService.currentDistrict;
  public readonly categories = this.discoveryService.categories;
  public readonly trendingPlaces = this.discoveryService.trendingPlaces;
  public readonly placeOfDay = this.discoveryService.placeOfDay;

  public readonly recentlyViewedPlaces = () => {
    const ids = this.userPrefsService.recentPlaceIds();
    return this.discoveryService.getPlacesByIds(ids).slice(0, 3);
  };

  public onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/places'], { queryParams: { q: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/places']);
    }
  }
}
