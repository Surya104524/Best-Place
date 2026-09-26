import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-rating-badge',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 font-semibold text-xs backdrop-blur-md">
      <app-icon name="star" [size]="13" class="fill-amber-400 text-amber-400"></app-icon>
      <span>{{ rating().toFixed(1) }}</span>
      @if (reviewCount()) {
        <span class="text-slate-400 font-normal text-[11px]">({{ reviewCount() }})</span>
      }
    </div>
  `
})
export class RatingBadgeComponent {
  rating = input.required<number>();
  reviewCount = input<number | undefined>(undefined);
}
