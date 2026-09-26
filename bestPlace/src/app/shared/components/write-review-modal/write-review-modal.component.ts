import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Place } from '../../../core/models/place.model';
import { Review } from '../../../core/models/review.model';
import { ReviewService } from '../../../core/services/review.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-write-review-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
      (click)="onBackdropClick($event)"
    >
      <div
        class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
      >
        <!-- Modal Header -->
        <div class="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
              <app-icon name="star" [size]="20" class="fill-amber-400"></app-icon>
            </div>
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-amber-400">Community Insight</span>
              <h3 class="text-base font-bold text-white leading-snug line-clamp-1">Review {{ place().name }}</h3>
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
          <!-- Rating Picker with Hover Scale -->
          <div class="text-center py-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/80">
            <span class="text-xs font-medium text-slate-400 block mb-2">How was your curated experience?</span>
            <div class="flex items-center justify-center gap-2">
              @for (star of [1, 2, 3, 4, 5]; track star) {
                <button
                  type="button"
                  (click)="rating.set(star)"
                  (mouseenter)="hoverStar.set(star)"
                  (mouseleave)="hoverStar.set(0)"
                  class="p-1.5 transition-transform duration-200 hover:scale-130 active:scale-90 focus:outline-none"
                >
                  <app-icon
                    name="star"
                    [size]="28"
                    [class]="(hoverStar() || rating()) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-700'"
                  ></app-icon>
                </button>
              }
            </div>
            <div class="text-xs font-semibold text-amber-300 mt-2 transition-all">
              @switch (rating()) {
                @case (5) { Exceptional Benchmark Experience }
                @case (4) { Great Curated Spot }
                @case (3) { Decent / Average }
                @case (2) { Needs Improvement }
                @default { Poor Experience }
              }
            </div>
          </div>

          <!-- Visit Type -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2">Who did you visit with?</label>
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              @for (type of visitTypes; track type) {
                <button
                  type="button"
                  (click)="selectedVisitType.set(type)"
                  class="py-2 px-2 rounded-xl border text-xs font-medium transition-all text-center hover:scale-105 active:scale-95"
                  [class]="selectedVisitType() === type
                    ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'"
                >
                  {{ type }}
                </button>
              }
            </div>
          </div>

          <!-- Review Content -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Your Curated Review & Tips</label>
            <textarea
              [(ngModel)]="reviewContent"
              name="reviewContent"
              rows="4"
              required
              placeholder="What stood out? Mention the Wi-Fi speed, coffee quality, sunset spot, best seating, or insider tips for fellow explorers..."
              class="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 leading-relaxed transition-colors"
            ></textarea>
          </div>

          <!-- Author Details -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-medium text-slate-400 mb-1">Your Name</label>
              <input
                type="text"
                [(ngModel)]="authorName"
                name="authorName"
                placeholder="e.g. Meera Raman"
                required
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label class="block text-[11px] font-medium text-slate-400 mb-1">Optional Photo Link</label>
              <input
                type="url"
                [(ngModel)]="photoUrl"
                name="photoUrl"
                placeholder="https://..."
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <!-- Submit -->
          <div class="pt-2">
            <button
              type="submit"
              [disabled]="!reviewContent.trim() || !authorName.trim()"
              class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <app-icon name="check" [size]="16"></app-icon>
              <span>Publish Verified Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class WriteReviewModalComponent {
  place = input.required<Place>();
  close = output<void>();

  private readonly reviewService = inject(ReviewService);

  public rating = signal<number>(5);
  public hoverStar = signal<number>(0);
  public selectedVisitType = signal<Review['visitType']>('Solo');

  public reviewContent = '';
  public authorName = 'Kavitha R.';
  public photoUrl = '';

  public visitTypes: Review['visitType'][] = ['Solo', 'Couples', 'Work / Remote', 'Friends', 'Family'];

  public onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('backdrop-blur-xl')) {
      this.close.emit();
    }
  }

  public onSubmit(): void {
    if (!this.reviewContent.trim() || !this.authorName.trim()) return;

    this.reviewService.addReview(
      this.place().id,
      this.authorName,
      this.rating(),
      this.reviewContent,
      this.selectedVisitType(),
      this.photoUrl ? [this.photoUrl] : undefined
    );

    this.close.emit();
  }
}
