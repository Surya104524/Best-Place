import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 transform translate-y-0 opacity-100"
          [class]="getToastClasses(toast.type)"
        >
          <!-- Icon -->
          <div class="mt-0.5 flex-shrink-0">
            @switch (toast.type) {
              @case ('success') {
                <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <app-icon name="check" [size]="14"></app-icon>
                </div>
              }
              @case ('warning') {
                <div class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <app-icon name="sparkles" [size]="14"></app-icon>
                </div>
              }
              @case ('error') {
                <div class="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <app-icon name="x" [size]="14"></app-icon>
                </div>
              }
              @default {
                <div class="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <app-icon name="compass" [size]="14"></app-icon>
                </div>
              }
            }
          </div>

          <!-- Content -->
          <div class="flex-grow min-w-0">
            <h4 class="text-xs font-semibold text-slate-100">{{ toast.title }}</h4>
            @if (toast.message) {
              <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">{{ toast.message }}</p>
            }
          </div>

          <!-- Close button -->
          <button
            type="button"
            (click)="toastService.remove(toast.id)"
            class="text-slate-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss"
          >
            <app-icon name="x" [size]="14"></app-icon>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  public readonly toastService = inject(ToastService);

  public getToastClasses(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'bg-slate-900/95 border-emerald-500/40 shadow-emerald-950/40 text-slate-100';
      case 'warning':
        return 'bg-slate-900/95 border-amber-500/40 shadow-amber-950/40 text-slate-100';
      case 'error':
        return 'bg-slate-900/95 border-rose-500/40 shadow-rose-950/40 text-slate-100';
      default:
        return 'bg-slate-900/95 border-cyan-500/40 shadow-cyan-950/40 text-slate-100';
    }
  }
}
