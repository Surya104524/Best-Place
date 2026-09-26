import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Place } from '../../../core/models/place.model';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
      (click)="onBackdropClick($event)"
    >
      <div
        class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 animate-scale-in"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <app-icon name="share" [size]="18"></app-icon>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Share Curated Dossier</h3>
              <p class="text-xs text-slate-400">Send {{ place().name }} to friends</p>
            </div>
          </div>
          <button
            type="button"
            (click)="close.emit()"
            class="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all hover:scale-110 active:scale-90"
          >
            <app-icon name="x" [size]="16"></app-icon>
          </button>
        </div>

        <!-- Place Preview Card -->
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-5">
          <img
            [src]="place().heroImage"
            [alt]="place().name"
            class="w-12 h-12 rounded-xl object-cover"
          />
          <div class="min-w-0 flex-grow">
            <h4 class="text-sm font-semibold text-slate-200 truncate">{{ place().name }}</h4>
            <p class="text-xs text-slate-400 truncate">{{ place().areaName }} • ⭐ {{ place().rating }}</p>
          </div>
        </div>

        <!-- Share Options Grid with Hover Scale -->
        <div class="grid grid-cols-3 gap-3 mb-5">
          <button
            type="button"
            (click)="shareToWhatsapp()"
            class="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-950/40 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-all duration-200 hover:-translate-y-1 active:scale-95 group shadow-sm"
          >
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-115 transition-transform">
              <app-icon name="message-square" [size]="18"></app-icon>
            </div>
            <span class="text-xs font-medium">WhatsApp</span>
          </button>

          <button
            type="button"
            (click)="shareToTwitter()"
            class="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-950/40 hover:bg-sky-950/40 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-sky-300 transition-all duration-200 hover:-translate-y-1 active:scale-95 group shadow-sm"
          >
            <div class="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-115 transition-transform">
              <app-icon name="globe" [size]="18"></app-icon>
            </div>
            <span class="text-xs font-medium">Twitter / X</span>
          </button>

          <button
            type="button"
            (click)="nativeShareOrCopy()"
            class="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-950/40 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-purple-300 transition-all duration-200 hover:-translate-y-1 active:scale-95 group shadow-sm"
          >
            <div class="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-115 transition-transform">
              <app-icon name="share" [size]="18"></app-icon>
            </div>
            <span class="text-xs font-medium">More...</span>
          </button>
        </div>

        <!-- Copy Link Field -->
        <div>
          <label class="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Direct Dossier Link</label>
          <div class="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <input
              type="text"
              readonly
              [value]="shareUrl"
              class="w-full bg-transparent px-2.5 text-xs text-slate-300 focus:outline-none select-all truncate font-mono"
            />
            <button
              type="button"
              (click)="copyLink()"
              class="flex-shrink-0 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ShareModalComponent {
  place = input.required<Place>();
  close = output<void>();

  private readonly toast = inject(ToastService);

  public get shareUrl(): string {
    return window.location.origin + '/places/' + this.place().slug;
  }

  public onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('backdrop-blur-xl')) {
      this.close.emit();
    }
  }

  public copyLink(): void {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.toast.success('Link Copied to Clipboard!', 'Share this place dossier anywhere.');
      this.close.emit();
    });
  }

  public shareToWhatsapp(): void {
    const text = encodeURIComponent(
      `Check out ${this.place().name} (${this.place().tagline}) on BEST PLACE: ${this.shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    this.close.emit();
  }

  public shareToTwitter(): void {
    const text = encodeURIComponent(
      `Discovering ${this.place().name} in ${this.place().districtName} on @bestplaceapp: ${this.shareUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    this.close.emit();
  }

  public nativeShareOrCopy(): void {
    if (navigator.share) {
      navigator
        .share({
          title: `BEST PLACE — ${this.place().name}`,
          text: this.place().tagline,
          url: this.shareUrl
        })
        .catch(() => {});
    } else {
      this.copyLink();
    }
  }
}
