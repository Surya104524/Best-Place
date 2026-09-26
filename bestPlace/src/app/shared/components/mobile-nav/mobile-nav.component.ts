import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookmarkService } from '../../../core/services/bookmark.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  template: `
    <nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800/80 px-2 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div class="flex items-center justify-around">
        <!-- Home / Explore -->
        <a
          routerLink="/"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="text-purple-400 font-bold"
          class="flex flex-col items-center gap-1 py-1 px-3 text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <app-icon name="compass" [size]="20" class="group-hover:scale-110 transition-transform"></app-icon>
          <span class="text-[10px] tracking-tight">Explore</span>
        </a>

        <!-- Curated Discovery Journey -->
        <a
          routerLink="/discover/districts"
          routerLinkActive="text-purple-400 font-bold"
          class="flex flex-col items-center gap-1 py-1 px-3 text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <app-icon name="map-pin" [size]="20" class="group-hover:scale-110 transition-transform"></app-icon>
          <span class="text-[10px] tracking-tight">Journey</span>
        </a>

        <!-- Map Explorer -->
        <a
          routerLink="/explore-map"
          routerLinkActive="text-purple-400 font-bold"
          class="flex flex-col items-center gap-1 py-1 px-3 text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <app-icon name="map" [size]="20" class="group-hover:scale-110 transition-transform"></app-icon>
          <span class="text-[10px] tracking-tight">Map</span>
        </a>

        <!-- Saved Places -->
        <a
          routerLink="/saved"
          routerLinkActive="text-purple-400 font-bold"
          class="relative flex flex-col items-center gap-1 py-1 px-3 text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <app-icon name="heart" [size]="20" class="group-hover:scale-110 transition-transform"></app-icon>
          @if (savedCount() > 0) {
            <span class="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              {{ savedCount() }}
            </span>
          }
          <span class="text-[10px] tracking-tight">Saved</span>
        </a>

        <!-- Profile -->
        <a
          routerLink="/profile"
          routerLinkActive="text-purple-400 font-bold"
          class="flex flex-col items-center gap-1 py-1 px-3 text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <app-icon name="user" [size]="20" class="group-hover:scale-110 transition-transform"></app-icon>
          <span class="text-[10px] tracking-tight">Profile</span>
        </a>
      </div>
    </nav>
  `
})
export class MobileNavComponent {
  private readonly bookmarkService = inject(BookmarkService);
  public readonly savedCount = () => this.bookmarkService.savedPlaceIds().length;
}
