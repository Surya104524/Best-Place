import { Injectable, signal, inject } from '@angular/core';
import { BookingRequest } from '../models/review.model';
import { ToastService } from './toast.service';

const BOOKINGS_STORAGE_KEY = 'best_place_user_bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly toast = inject(ToastService);
  private readonly bookingsSignal = signal<BookingRequest[]>(this.loadBookings());
  public readonly bookings = this.bookingsSignal.asReadonly();

  private loadBookings(): BookingRequest[] {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public createBooking(booking: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>): BookingRequest {
    const newBooking: BookingRequest = {
      ...booking,
      id: 'book_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.bookingsSignal.update((list) => [newBooking, ...list]);

    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(this.bookingsSignal()));
    } catch (err) {
      console.warn('Could not persist booking', err);
    }

    this.toast.success(
      'Reservation Confirmed! 🎉',
      `Your table at ${booking.placeName} for ${booking.guestCount} guests on ${booking.date} (${booking.timeSlot}) is locked in.`
    );

    return newBooking;
  }

  public cancelBooking(id: string): void {
    this.bookingsSignal.update((list) =>
      list.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(this.bookingsSignal()));
    } catch (err) {
      console.warn('Could not update booking', err);
    }
    this.toast.info('Reservation Cancelled');
  }
}
