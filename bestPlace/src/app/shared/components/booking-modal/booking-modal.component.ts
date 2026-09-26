import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Place } from '../../../core/models/place.model';
import { BookingService } from '../../../core/services/booking.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
      (click)="onBackdropClick($event)"
    >
      <div
        class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
      >
        <!-- Modal Header with Place Snippet -->
        <div class="relative p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img
              [src]="place().heroImage"
              [alt]="place().name"
              class="w-12 h-12 rounded-xl object-cover border border-white/10"
            />
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-purple-400">Curated Reservation</span>
              <h3 class="text-base font-bold text-white leading-snug line-clamp-1">{{ place().name }}</h3>
            </div>
          </div>
          <button
            type="button"
            (click)="close.emit()"
            class="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all hover:scale-110 active:scale-90"
          >
            <app-icon name="x" [size]="18"></app-icon>
          </button>
        </div>

        <!-- Form Body -->
        <form (ngSubmit)="onSubmit()" class="flex-grow overflow-y-auto p-5 space-y-5">
          <!-- Guests -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2">Number of Guests</label>
            <div class="grid grid-cols-5 gap-2">
              @for (count of [1, 2, 3, 4, 6]; track count) {
                <button
                  type="button"
                  (click)="guestCount.set(count)"
                  class="py-2.5 rounded-xl border text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                  [class]="guestCount() === count
                    ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                    : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'"
                >
                  {{ count }} {{ count === 1 ? 'Guest' : 'Guests' }}
                </button>
              }
            </div>
          </div>

          <!-- Date Selection -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2">Select Date</label>
            <div class="grid grid-cols-3 gap-2 mb-2">
              <button
                type="button"
                (click)="setDatePreset('Today')"
                class="py-2 px-3 rounded-xl border text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                [class]="selectedDateLabel() === 'Today'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800'"
              >
                Today
              </button>
              <button
                type="button"
                (click)="setDatePreset('Tomorrow')"
                class="py-2 px-3 rounded-xl border text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                [class]="selectedDateLabel() === 'Tomorrow'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800'"
              >
                Tomorrow
              </button>
              <button
                type="button"
                (click)="setDatePreset('Weekend')"
                class="py-2 px-3 rounded-xl border text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                [class]="selectedDateLabel() === 'Weekend'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800'"
              >
                This Weekend
              </button>
            </div>
          </div>

          <!-- Time Slot -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2">Select Experience Slot</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              @for (slot of timeSlots; track slot.time) {
                <button
                  type="button"
                  (click)="selectedTimeSlot.set(slot.time)"
                  class="p-2.5 rounded-xl border text-left transition-all hover:scale-105 active:scale-95"
                  [class]="selectedTimeSlot() === slot.time
                    ? 'bg-purple-600/20 border-purple-500 text-purple-200 ring-1 ring-purple-500 shadow-md'
                    : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800'"
                >
                  <div class="text-xs font-bold text-slate-100">{{ slot.time }}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5 truncate">{{ slot.tag }}</div>
                </button>
              }
            </div>
          </div>

          <!-- Seating Preference -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2">Seating Preference</label>
            <div class="grid grid-cols-2 gap-2">
              @for (pref of seatingOptions; track pref) {
                <button
                  type="button"
                  (click)="seatingPref.set(pref)"
                  class="py-2 px-3 rounded-xl border text-xs font-medium text-left transition-all hover:scale-105 active:scale-95"
                  [class]="seatingPref() === pref
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-sm'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'"
                >
                  {{ pref }}
                </button>
              }
            </div>
          </div>

          <!-- Guest Contact Info -->
          <div class="space-y-3 pt-2 border-t border-slate-800">
            <div>
              <label class="block text-[11px] font-medium text-slate-400 mb-1">Your Full Name</label>
              <input
                type="text"
                [(ngModel)]="guestName"
                name="guestName"
                placeholder="e.g. Senthil Kumar"
                required
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-medium text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  [(ngModel)]="guestPhone"
                  name="guestPhone"
                  placeholder="+91 98765 43210"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-[11px] font-medium text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  [(ngModel)]="guestEmail"
                  name="guestEmail"
                  placeholder="name@example.com"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button with Spring Hover -->
          <div class="pt-2">
            <button
              type="submit"
              class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <app-icon name="sparkles" [size]="16"></app-icon>
              <span>Confirm Instant Reservation</span>
            </button>
            <p class="text-center text-[11px] text-slate-500 mt-2">
              No deposit required • Instant confirmation via Best Place Concierge
            </p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class BookingModalComponent {
  place = input.required<Place>();
  close = output<void>();

  private readonly bookingService = inject(BookingService);

  public guestCount = signal<number>(2);
  public selectedDateLabel = signal<string>('Today');
  public selectedTimeSlot = signal<string>('07:00 PM');
  public seatingPref = signal<'Window View' | 'Outdoor Terrace' | 'Quiet Mezzanine' | 'Standard Lounge'>('Window View');

  public guestName = 'Surya S.';
  public guestPhone = '+91 98430 11223';
  public guestEmail = 'surya@example.com';

  public timeSlots = [
    { time: '08:30 AM', tag: 'Morning Light' },
    { time: '11:00 AM', tag: 'Brunch Hour' },
    { time: '05:30 PM', tag: 'Golden Hour' },
    { time: '07:00 PM', tag: 'Prime Twilight' },
    { time: '08:30 PM', tag: 'Dinner Vibe' },
    { time: '10:00 PM', tag: 'Late Night' }
  ];

  public seatingOptions: ('Window View' | 'Outdoor Terrace' | 'Quiet Mezzanine' | 'Standard Lounge')[] = [
    'Window View',
    'Outdoor Terrace',
    'Quiet Mezzanine',
    'Standard Lounge'
  ];

  public setDatePreset(label: string): void {
    this.selectedDateLabel.set(label);
  }

  public onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('backdrop-blur-xl')) {
      this.close.emit();
    }
  }

  public onSubmit(): void {
    this.bookingService.createBooking({
      placeId: this.place().id,
      placeName: this.place().name,
      placeImage: this.place().heroImage,
      guestName: this.guestName,
      guestEmail: this.guestEmail,
      guestPhone: this.guestPhone,
      date: this.selectedDateLabel() === 'Today' ? 'Today, Aug 30' : 'Tomorrow, Aug 31',
      timeSlot: this.selectedTimeSlot(),
      guestCount: this.guestCount(),
      seatingPreference: this.seatingPref()
    });

    this.close.emit();
  }
}
