import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DiscoveryService } from '../../core/services/discovery.service';
import { BookmarkService } from '../../core/services/bookmark.service';
import { ReviewService } from '../../core/services/review.service';
import { UserPrefsService } from '../../core/services/user-prefs.service';
import { ToastService } from '../../core/services/toast.service';
import { Place } from '../../core/models/place.model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RatingBadgeComponent } from '../../shared/components/rating-badge/rating-badge.component';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';
import { BookingModalComponent } from '../../shared/components/booking-modal/booking-modal.component';
import { ShareModalComponent } from '../../shared/components/share-modal/share-modal.component';
import { WriteReviewModalComponent } from '../../shared/components/write-review-modal/write-review-modal.component';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IconComponent,
    RatingBadgeComponent,
    PlaceCardComponent,
    BookingModalComponent,
    ShareModalComponent,
    WriteReviewModalComponent
  ],
  template: `
    @if (place(); as p) {
      <div class="min-h-screen pb-32 pt-4 animate-fade-in-up">
        <!-- TOP BREADCRUMB NAVIGATION -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <a routerLink="/" class="hover:text-slate-200 transition-colors">Home</a>
            <span>/</span>
            <a [routerLink]="['/discover/areas']" [queryParams]="{ district: p.districtId }" class="hover:text-slate-200 transition-colors">
              {{ p.districtName }}
            </a>
            <span>/</span>
            <a [routerLink]="['/places']" [queryParams]="{ district: p.districtId, area: p.areaId }" class="hover:text-slate-200 transition-colors">
              {{ p.areaName }}
            </a>
            <span>/</span>
            <span class="text-purple-300 font-medium truncate">{{ p.name }}</span>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <!-- SCREEN 06: HERO GALLERY & PLACE HEADER -->
          <section class="space-y-6">
            <!-- Image Gallery with Lightbox trigger -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
              <!-- Main Active Image with Smooth Transition -->
              <div class="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
                <img
                  [src]="activeGalleryImage()"
                  [alt]="p.name"
                  class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                <!-- Open Lightbox Button -->
                <button
                  type="button"
                  (click)="isLightboxOpen.set(true)"
                  class="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <app-icon name="camera" [size]="15"></app-icon>
                  <span>View All Photos ({{ p.gallery.length }})</span>
                </button>
              </div>

              <!-- Thumbnail Strip with Smooth Hover States -->
              <div class="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4">
                @for (photo of p.gallery.slice(0, 4); track photo; let idx = $index) {
                  <div
                    (click)="activeGalleryImage.set(photo)"
                    class="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 group hover:-translate-y-1"
                    [class]="activeGalleryImage() === photo ? 'border-purple-500 ring-2 ring-purple-500/30 scale-[1.02]' : 'border-slate-800/80 hover:border-slate-600'"
                  >
                    <img
                      [src]="photo"
                      [alt]="p.name + ' preview ' + (idx + 1)"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    @if (idx === 3 && p.gallery.length > 4) {
                      <div class="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm">
                        +{{ p.gallery.length - 4 }} More
                      </div>
                    }
                  </div>
                }
              </div>
            </div>

            <!-- Place Header & Actions -->
            <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-slate-800/80">
              <div class="space-y-3 max-w-3xl">
                <!-- Badges Row -->
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 shadow-sm">
                    <span>{{ p.categoryEmoji }}</span>
                    <span>{{ p.categoryName }}</span>
                  </span>

                  @if (p.badge) {
                    <span class="px-3 py-1 rounded-full bg-purple-600/90 text-white text-xs font-bold shadow-sm animate-pulse-glow">
                      {{ p.badge }}
                    </span>
                  }

                  <!-- Live Open/Closed Badge -->
                  <div
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium"
                    [class]="p.isOpenNow ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" [class]="p.isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'"></span>
                    <span>{{ p.isOpenNow ? 'Open Now • Closes ' + p.closingTimeToday : 'Closed' }}</span>
                  </div>

                  <span class="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs font-semibold">
                    {{ p.priceLevel }}
                  </span>
                </div>

                <!-- Title & Rating -->
                <div class="space-y-1">
                  <div class="flex items-center gap-3 flex-wrap">
                    <h1 class="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                      {{ p.name }}
                    </h1>
                    <app-rating-badge [rating]="p.rating" [reviewCount]="p.reviewCount"></app-rating-badge>
                  </div>
                  <p class="text-sm sm:text-base text-slate-300 font-normal">
                    {{ p.tagline }}
                  </p>
                </div>

                <!-- Address & Location -->
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <app-icon name="map-pin" [size]="15" class="text-purple-400 flex-shrink-0"></app-icon>
                  <span>{{ p.address }}</span>
                </div>
              </div>

              <!-- Desktop Action Buttons with Hover & Spring Animations -->
              <div class="hidden lg:flex items-center gap-3 flex-shrink-0">
                <!-- Save Toggle -->
                <button
                  type="button"
                  (click)="toggleBookmark()"
                  class="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
                  [class]="isSaved() ? 'border-rose-500/50 text-rose-400' : 'border-slate-800 text-slate-300'"
                >
                  <app-icon name="heart" [size]="16" [class]="isSaved() ? 'fill-rose-500 text-rose-500 animate-heart-bounce' : ''"></app-icon>
                  <span>{{ isSaved() ? 'Saved' : 'Save Place' }}</span>
                </button>

                <!-- Share -->
                <button
                  type="button"
                  (click)="isShareOpen.set(true)"
                  class="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
                >
                  <app-icon name="share" [size]="16"></app-icon>
                  <span>Share</span>
                </button>

                <!-- Directions -->
                <button
                  type="button"
                  (click)="getDirections()"
                  class="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-white text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
                >
                  <app-icon name="map-pin" [size]="16"></app-icon>
                  <span>Get Directions</span>
                </button>

                <!-- Reserve CTA -->
                <button
                  type="button"
                  (click)="isBookingOpen.set(true)"
                  class="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_25px_rgba(147,51,234,0.45)] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <app-icon name="calendar" [size]="16"></app-icon>
                  <span>Reserve Table / Spot</span>
                </button>
              </div>
            </div>
          </section>

          <!-- SCREEN 07: SMART INSIGHTS DOSSIER -->
          <section class="space-y-6">
            <div>
              <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                <app-icon name="sparkles" [size]="14"></app-icon>
                <span>Curator Intelligence</span>
              </div>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-white">Smart Insights & Best Time</h2>
              <p class="text-xs sm:text-sm text-slate-400">
                Verified telemetry and real-time guidance by Best Place field curators.
              </p>
            </div>

            <!-- Insights 4-Card Grid with Staggered Hover Glows -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Best Time -->
              <div class="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-2 backdrop-blur-md transition-all hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-lg">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold uppercase tracking-wider text-amber-400">Best Time to Visit</span>
                  <app-icon name="clock" [size]="18" class="text-amber-400"></app-icon>
                </div>
                <div class="font-display font-bold text-lg text-white">
                  {{ p.insights.bestTime.slot }}
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  {{ p.insights.bestTime.vibeReason }}
                </p>
              </div>

              <!-- Crowd Level Gauge with Animated Progress -->
              <div class="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-2 backdrop-blur-md transition-all hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-lg">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">Crowd Level</span>
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div class="font-display font-bold text-lg text-white capitalize">
                  {{ p.insights.crowdLevel.status }} Crowd
                </div>
                <!-- Progress bar -->
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden my-1">
                  <div
                    class="h-full bg-emerald-400 rounded-full animate-progress-fill"
                    [style.width.%]="p.insights.crowdLevel.scorePercentage"
                  ></div>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  {{ p.insights.crowdLevel.label }}
                </p>
              </div>

              <!-- Wi-Fi & Work Score -->
              <div class="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-2 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-lg">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold uppercase tracking-wider text-cyan-400">Wi-Fi & Work Score</span>
                  <app-icon name="wifi" [size]="18" class="text-cyan-400 animate-pulse"></app-icon>
                </div>
                <div class="font-display font-bold text-lg text-white">
                  ⚡ {{ p.insights.wifi.speedMbps }} Mbps
                  <span class="text-xs font-normal text-cyan-300">({{ p.insights.wifi.workScore }}/10)</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  {{ p.insights.wifi.label }}
                </p>
              </div>

              <!-- Noise Level & Atmosphere -->
              <div class="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-2 backdrop-blur-md transition-all hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-lg">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold uppercase tracking-wider text-purple-400">Acoustic Score</span>
                  <app-icon name="music" [size]="18" class="text-purple-400"></app-icon>
                </div>
                <div class="font-display font-bold text-lg text-white">
                  🔈 {{ p.insights.noiseLevel.decibels }} dB
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  {{ p.insights.noiseLevel.label }}
                </p>
              </div>
            </div>

            <!-- AI / Curator Recommendation Banner -->
            <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-900 border border-purple-500/30 space-y-3 shadow-xl hover:border-purple-500/50 transition-colors">
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                <app-icon name="badge-check" [size]="16" class="text-purple-400"></app-icon>
                <span>Curator's Pro Insider Recommendation</span>
              </div>
              <p class="text-sm sm:text-base text-slate-200 italic leading-relaxed font-serif">
                “{{ p.insights.aiRecommendation }}”
              </p>
              <div class="flex items-center justify-between pt-1 text-xs text-slate-400">
                <span>{{ p.insights.curatorSignatureNote }}</span>
                <span class="text-amber-300 font-semibold">📸 Instagram Score: {{ p.insights.instagramSpotScore }} / 10</span>
              </div>
            </div>
          </section>

          <!-- ABOUT, HIGHLIGHTS & VERIFIED AMENITIES -->
          <section class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left: Description & Highlights -->
            <div class="lg:col-span-8 space-y-8">
              <!-- About -->
              <div class="space-y-3">
                <h3 class="font-display text-xl font-bold text-white">About the Space</h3>
                <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {{ p.description }}
                </p>
              </div>

              <!-- Curator Verdict -->
              <div class="p-5 rounded-2xl bg-slate-900/60 border-l-4 border-purple-500 space-y-1 shadow-md">
                <span class="text-xs font-bold uppercase tracking-wider text-purple-300">Curator Verdict</span>
                <p class="text-sm text-slate-200 font-medium leading-relaxed">
                  {{ p.curatorVerdict }}
                </p>
              </div>

              <!-- Highlights Tags -->
              <div class="space-y-3">
                <h3 class="font-display text-xl font-bold text-white">Curated Highlights</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  @for (highlight of p.highlights; track highlight) {
                    <div class="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200 hover:border-purple-500/30 transition-colors">
                      <div class="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                        <app-icon name="check" [size]="12"></app-icon>
                      </div>
                      <span>{{ highlight }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Verified Amenities Grid -->
              <div class="space-y-3">
                <h3 class="font-display text-xl font-bold text-white">Verified Amenities</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  @for (amenity of p.amenities; track amenity.id) {
                    <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/30 transition-colors">
                      <div class="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                        <app-icon [name]="amenity.iconName" [size]="16"></app-icon>
                      </div>
                      <span class="text-xs sm:text-sm font-medium text-slate-200">{{ amenity.name }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Right Sidebar: Opening Hours & Contact Info -->
            <div class="lg:col-span-4 space-y-6">
              <!-- Quick Info Card -->
              <div class="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-5 backdrop-blur-md shadow-xl">
                <h4 class="font-display text-lg font-bold text-white border-b border-slate-800 pb-3">
                  Hours & Practicalities
                </h4>

                <!-- Weekly Hours List -->
                <div class="space-y-2.5 text-xs">
                  @for (hour of p.openingHours; track hour.day) {
                    <div class="flex items-center justify-between py-1 border-b border-slate-800/50">
                      <span class="text-slate-400 font-medium">{{ hour.day }}</span>
                      @if (hour.isClosed) {
                        <span class="text-rose-400 font-semibold">Closed</span>
                      } @else {
                        <span class="text-slate-200 font-mono">{{ hour.open }} – {{ hour.close }}</span>
                      }
                    </div>
                  }
                </div>

                <!-- Contact & Links -->
                <div class="space-y-3 pt-2">
                  <a
                    [href]="'tel:' + p.phone"
                    class="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-200 transition-all hover:scale-[1.02]"
                  >
                    <div class="flex items-center gap-2.5">
                      <app-icon name="phone" [size]="15" class="text-purple-400"></app-icon>
                      <span>{{ p.phone }}</span>
                    </div>
                    <app-icon name="external-link" [size]="12" class="text-slate-500"></app-icon>
                  </a>

                  <a
                    [href]="p.websiteUrl"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-200 transition-all hover:scale-[1.02]"
                  >
                    <div class="flex items-center gap-2.5">
                      <app-icon name="globe" [size]="15" class="text-cyan-400"></app-icon>
                      <span>Official Website</span>
                    </div>
                    <app-icon name="external-link" [size]="12" class="text-slate-500"></app-icon>
                  </a>

                  @if (p.instagramHandle) {
                    <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                      <app-icon name="instagram" [size]="15" class="text-pink-400"></app-icon>
                      <span>{{ p.instagramHandle }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>

          <!-- SCREEN 08: REVIEWS & COMMUNITY INSIGHTS -->
          <section class="space-y-6 pt-4 border-t border-slate-800/80">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-purple-400">Community Verdict</div>
                <h2 class="font-display text-2xl sm:text-3xl font-bold text-white">Verified Reviews ({{ placeReviews().length }})</h2>
              </div>

              <button
                type="button"
                (click)="isWriteReviewOpen.set(true)"
                class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 self-start sm:self-auto"
              >
                <app-icon name="star" [size]="14"></app-icon>
                <span>Write a Review</span>
              </button>
            </div>

            <!-- Ratings Breakdown & Bars -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <!-- Score Box -->
              <div class="lg:col-span-4 flex flex-col items-center justify-center p-4 text-center border-b lg:border-b-0 lg:border-r border-slate-800">
                <div class="font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
                  {{ p.rating.toFixed(1) }}
                </div>
                <div class="flex items-center gap-1 my-2">
                  @for (star of [1, 2, 3, 4, 5]; track star) {
                    <app-icon name="star" [size]="18" class="fill-amber-400 text-amber-400"></app-icon>
                  }
                </div>
                <p class="text-xs text-slate-400">Based on {{ p.reviewCount }} verified visits</p>
              </div>

              <!-- Rating Distribution Bars with Animation -->
              <div class="lg:col-span-8 space-y-2 flex flex-col justify-center">
                @for (star of [5, 4, 3, 2, 1]; track star) {
                  <div class="flex items-center gap-3 text-xs">
                    <span class="w-8 text-slate-400 font-mono">{{ star }}★</span>
                    <div class="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-amber-400 rounded-full animate-progress-fill"
                        [style.width.%]="getStarPercentage(star)"
                      ></div>
                    </div>
                    <span class="w-8 text-right text-slate-500 font-mono">{{ getStarPercentage(star) }}%</span>
                  </div>
                }
              </div>
            </div>

            <!-- Reviews List -->
            <div class="space-y-4">
              @for (review of placeReviews(); track review.id) {
                <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-purple-500/30 transition-colors">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <img
                        [src]="review.authorAvatar"
                        [alt]="review.authorName"
                        class="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div class="flex items-center gap-2">
                          <h5 class="text-sm font-semibold text-white">{{ review.authorName }}</h5>
                          @if (review.isVerifiedVisit) {
                            <span class="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                              Verified Visit
                            </span>
                          }
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span class="text-purple-300 font-medium">{{ review.visitType }}</span>
                          <span>•</span>
                          <span>{{ review.date }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Stars -->
                    <div class="flex items-center gap-1">
                      @for (s of [1, 2, 3, 4, 5]; track s) {
                        <app-icon
                          name="star"
                          [size]="13"
                          [class]="s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'"
                        ></app-icon>
                      }
                    </div>
                  </div>

                  <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {{ review.content }}
                  </p>

                  <!-- Photo attachments if any -->
                  @if (review.photos && review.photos.length > 0) {
                    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                      @for (photo of review.photos; track photo) {
                        <img
                          [src]="photo"
                          alt="Review attachment"
                          class="w-20 h-20 rounded-xl object-cover border border-white/10 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                          (click)="activeGalleryImage.set(photo); isLightboxOpen.set(true)"
                        />
                      }
                    </div>
                  }

                  <!-- Helpful Button -->
                  <div class="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
                    <button
                      type="button"
                      (click)="reviewService.upvoteHelpful(review.id)"
                      class="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors active:scale-90"
                    >
                      <app-icon name="thumbs-up" [size]="13" [class]="review.isHelpfulClicked ? 'text-purple-400 fill-purple-400' : ''"></app-icon>
                      <span>Helpful ({{ review.helpfulCount }})</span>
                    </button>
                  </div>
                </div>
              }
            </div>
          </section>

          <!-- FINAL ACTION: EXPLORE SIMILAR CURATED PLACES -->
          <section class="space-y-6 pt-4 border-t border-slate-800/80">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-purple-400">Discover More</div>
                <h2 class="font-display text-2xl font-bold text-white">Similar Curated Spots</h2>
              </div>
              <a
                [routerLink]="['/places']"
                [queryParams]="{ district: p.districtId, category: p.categoryId }"
                class="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Category →
              </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (rel of relatedPlaces(); track rel.id) {
                <app-place-card [place]="rel"></app-place-card>
              }
            </div>
          </section>
        </div>

        <!-- STICKY MOBILE BOTTOM ACTION BAR -->
        <div class="lg:hidden fixed bottom-16 inset-x-0 z-30 p-3 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800 flex items-center gap-2 shadow-2xl">
          <button
            type="button"
            (click)="toggleBookmark()"
            class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:scale-90 transition-transform"
            aria-label="Save"
          >
            <app-icon name="heart" [size]="18" [class]="isSaved() ? 'fill-rose-500 text-rose-500 animate-heart-bounce' : ''"></app-icon>
          </button>
          <button
            type="button"
            (click)="isShareOpen.set(true)"
            class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:scale-90 transition-transform"
            aria-label="Share"
          >
            <app-icon name="share" [size]="18"></app-icon>
          </button>
          <button
            type="button"
            (click)="getDirections()"
            class="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 active:scale-90 transition-transform"
            aria-label="Directions"
          >
            <app-icon name="map-pin" [size]="18"></app-icon>
          </button>
          <button
            type="button"
            (click)="isBookingOpen.set(true)"
            class="flex-grow py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <app-icon name="calendar" [size]="14"></app-icon>
            <span>Reserve Table</span>
          </button>
        </div>

        <!-- MODALS WITH SCALE-IN ANIMATIONS -->
        @if (isLightboxOpen()) {
          <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-scale-in"
            (click)="isLightboxOpen.set(false)"
          >
            <button
              type="button"
              class="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white hover:scale-110 active:scale-90 transition-transform"
            >
              <app-icon name="x" [size]="20"></app-icon>
            </button>
            <img
              [src]="activeGalleryImage()"
              [alt]="p.name"
              class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        }

        @if (isBookingOpen()) {
          <app-booking-modal [place]="p" (close)="isBookingOpen.set(false)"></app-booking-modal>
        }

        @if (isShareOpen()) {
          <app-share-modal [place]="p" (close)="isShareOpen.set(false)"></app-share-modal>
        }

        @if (isWriteReviewOpen()) {
          <app-write-review-modal [place]="p" (close)="isWriteReviewOpen.set(false)"></app-write-review-modal>
        }
      </div>
    } @else {
      <!-- Place Not Found -->
      <div class="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 animate-fade-in-up">
        <div class="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
          <app-icon name="compass" [size]="28"></app-icon>
        </div>
        <h2 class="text-2xl font-bold text-white">Place Dossier Not Found</h2>
        <p class="text-xs text-slate-400 mt-1 max-w-sm">
          The requested place could not be located. Discover other verified places.
        </p>
        <a
          routerLink="/places"
          class="mt-6 px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
        >
          Browse All Places
        </a>
      </div>
    }
  `
})
export class PlaceDetailComponent implements OnInit {
  private readonly discoveryService = inject(DiscoveryService);
  private readonly bookmarkService = inject(BookmarkService);
  public readonly reviewService = inject(ReviewService);
  private readonly userPrefsService = inject(UserPrefsService);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);

  public slug = signal<string>('quantum-coffee-lab');
  public activeGalleryImage = signal<string>('');

  public isLightboxOpen = signal<boolean>(false);
  public isBookingOpen = signal<boolean>(false);
  public isShareOpen = signal<boolean>(false);
  public isWriteReviewOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slugParam = params['slug'];
      if (slugParam) {
        this.slug.set(slugParam);
        const p = this.discoveryService.getPlaceBySlug(slugParam);
        if (p) {
          this.activeGalleryImage.set(p.heroImage);
          this.userPrefsService.recordView(p.id);
        }
      }
    });
  }

  public readonly place = computed(() => {
    return this.discoveryService.getPlaceBySlug(this.slug());
  });

  public readonly placeReviews = computed(() => {
    const p = this.place();
    return p ? this.reviewService.getReviewsForPlace(p.id) : [];
  });

  public readonly relatedPlaces = computed(() => {
    const p = this.place();
    return p ? this.discoveryService.getRelatedPlaces(p, 3) : [];
  });

  public isSaved(): boolean {
    const p = this.place();
    return p ? this.bookmarkService.isSaved(p.id) : false;
  }

  public toggleBookmark(): void {
    const p = this.place();
    if (p) {
      this.bookmarkService.toggleSave(p.id, p.name);
    }
  }

  public getDirections(): void {
    const p = this.place();
    if (!p) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' ' + p.address)}`;
    window.open(url, '_blank');
    this.toast.info('Opening Google Maps Directions', p.address);
  }

  public getStarPercentage(star: number): number {
    switch (star) {
      case 5: return 85;
      case 4: return 12;
      case 3: return 3;
      case 2: return 0;
      default: return 0;
    }
  }
}
