import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPrefsService } from '../../core/services/user-prefs.service';
import { BookingService } from '../../core/services/booking.service';
import { BookmarkService } from '../../core/services/bookmark.service';
import { DiscoveryService } from '../../core/services/discovery.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 min-h-screen">
      <!-- Profile Card Header -->
      <div class="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <!-- Avatar -->
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Explorer Avatar"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-purple-500/50 shadow-xl"
          />
          <div class="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold border border-white/20 shadow">
            Curator VIP
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-2 flex-grow">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-white">Surya S.</h1>
              <p class="text-xs text-purple-300 font-medium">Curator Level 4 • Specialty Coffee & Sunsets Enthusiast</p>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold self-center sm:self-auto">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Verified Explorer</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-300 max-w-xl">
            Passionate about third-wave micro-roasteries, panoramic mountain viewpoints, and hidden acoustic listening lounges across Tamil Nadu.
          </p>

          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-3 pt-3">
            <div class="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div class="font-display font-bold text-lg text-white">{{ savedCount() }}</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400">Saved Places</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div class="font-display font-bold text-lg text-purple-400">{{ activeBookings().length }}</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400">Reservations</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div class="font-display font-bold text-lg text-cyan-400">7</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400">Districts Explored</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTIVE RESERVATIONS SECTION -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="font-display text-xl sm:text-2xl font-bold text-white">Your Reservations</h2>
          <span class="text-xs text-slate-400">{{ activeBookings().length }} Bookings</span>
        </div>

        @if (activeBookings().length > 0) {
          <div class="space-y-3">
            @for (booking of activeBookings(); track booking.id) {
              <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                  <img
                    [src]="booking.placeImage"
                    [alt]="booking.placeName"
                    class="w-14 h-14 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h4 class="text-base font-bold text-white">{{ booking.placeName }}</h4>
                    <div class="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                      <span class="text-purple-300 font-semibold">{{ booking.date }}</span>
                      <span>•</span>
                      <span>{{ booking.timeSlot }}</span>
                      <span>•</span>
                      <span>{{ booking.guestCount }} Guests</span>
                    </div>
                    @if (booking.seatingPreference) {
                      <span class="text-[11px] text-cyan-300">Preference: {{ booking.seatingPreference }}</span>
                    }
                  </div>
                </div>

                <div class="flex items-center gap-2 self-end sm:self-auto">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold"
                    [class]="booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'">
                    {{ booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled' }}
                  </span>
                  @if (booking.status === 'confirmed') {
                    <button
                      type="button"
                      (click)="bookingService.cancelBooking(booking.id!)"
                      class="px-3 py-1 rounded-xl bg-slate-800 hover:bg-rose-950/50 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs transition-colors"
                    >
                      Cancel
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
            No active reservations. Browse curated places and reserve your experience directly!
          </div>
        }
      </section>

      <!-- PREFERENCES & SETTINGS -->
      <section class="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-6">
        <h3 class="font-display text-xl font-bold text-white">Discovery Preferences</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Default District -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold text-slate-300">Default Home District</label>
            <select
              [ngModel]="userPrefsService.defaultDistrictId()"
              (ngModelChange)="onDistrictChange($event)"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
            >
              @for (dist of districts(); track dist.id) {
                <option [value]="dist.id">{{ dist.name }} ({{ dist.state }})</option>
              }
            </select>
            <p class="text-[11px] text-slate-500">Your discovery journey will default to this city.</p>
          </div>

          <!-- Preferred Vibe -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold text-slate-300">Favorite Vibe / Atmosphere</label>
            <input
              type="text"
              [(ngModel)]="userPrefsService.preferences().preferredVibe"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
            />
            <p class="text-[11px] text-slate-500">Helps personalize the "Place of the Day" selection.</p>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            (click)="userPrefsService.clearRecent(); toast.info('Recent view history cleared')"
            class="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Clear Recently Viewed Cache
          </button>

          <button
            type="button"
            (click)="savePrefs()"
            class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md"
          >
            Save Preferences
          </button>
        </div>
      </section>
    </div>
  `
})
export class ProfileComponent {
  public readonly userPrefsService = inject(UserPrefsService);
  public readonly bookingService = inject(BookingService);
  private readonly bookmarkService = inject(BookmarkService);
  private readonly discoveryService = inject(DiscoveryService);
  public readonly toast = inject(ToastService);

  public readonly districts = this.discoveryService.districts;
  public readonly activeBookings = this.bookingService.bookings;
  public readonly savedCount = () => this.bookmarkService.savedPlaceIds().length;

  public onDistrictChange(newDistrictId: string): void {
    this.userPrefsService.setDefaultDistrict(newDistrictId);
    this.discoveryService.selectedDistrictId.set(newDistrictId);
    this.toast.success('Default District Updated', `Set to ${newDistrictId}`);
  }

  public savePrefs(): void {
    this.toast.success('Preferences Saved', 'Your custom preferences have been updated.');
  }
}
