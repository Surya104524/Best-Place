import { Component, signal, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DiscoveryService } from '../../../core/services/discovery.service';
import { BookmarkService } from '../../../core/services/bookmark.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  template: `
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        <!-- Logo & Branding -->
        <div class="flex items-center gap-6">
          <a routerLink="/" class="flex items-center gap-2.5 group">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-[0_0_20px_rgba(147,51,234,0.35)] group-hover:scale-105 transition-transform">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <app-icon name="compass" [size]="20" class="text-cyan-400 group-hover:rotate-45 transition-transform duration-300"></app-icon>
              </div>
            </div>
            <div class="flex flex-col">
              <span class="font-display font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                BEST<span class="text-purple-400">PLACE</span>
              </span>
              <span class="text-[9px] uppercase tracking-widest text-slate-400 font-semibold hidden sm:inline-block">
                Hyperlocal Curation
              </span>
            </div>
          </a>

          <!-- Active District Selector Pill -->
          <a
            routerLink="/discover/districts"
            class="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-purple-500/40 text-xs font-medium text-slate-200 transition-all shadow-sm"
          >
            <app-icon name="map-pin" [size]="13" class="text-purple-400"></app-icon>
            <span class="font-semibold text-white">{{ currentDistrict().name }}</span>
            <span class="text-[10px] text-slate-400 font-mono">({{ currentDistrict().curatedPlacesCount }} places)</span>
            <app-icon name="chevron-down" [size]="12" class="text-slate-400"></app-icon>
          </a>
        </div>

        <!-- Center Search Trigger Button -->
        <div class="flex-grow max-w-md hidden lg:block mx-4">
          <button
            type="button"
            (click)="openSearch.emit()"
            class="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-400 transition-all shadow-inner group"
          >
            <div class="flex items-center gap-2.5">
              <app-icon name="search" [size]="15" class="text-purple-400"></app-icon>
              <span>Search places, vibes, coffee, sunsets...</span>
            </div>
            <kbd class="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-400 group-hover:text-purple-300">
              ⌘K
            </kbd>
          </button>
        </div>

        <!-- Right Desktop Navigation Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Mobile search icon -->
          <button
            type="button"
            (click)="openSearch.emit()"
            class="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Search"
          >
            <app-icon name="search" [size]="18"></app-icon>
          </button>

          <!-- Nav Links -->
          <nav class="hidden md:flex items-center gap-1">
            <a
              routerLink="/discover/districts"
              routerLinkActive="bg-purple-600/20 text-purple-300 border-purple-500/30"
              class="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent transition-all"
            >
              Curated Journey
            </a>
            <a
              routerLink="/places"
              routerLinkActive="bg-purple-600/20 text-purple-300 border-purple-500/30"
              [queryParams]="{ district: 'coimbatore' }"
              class="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent transition-all"
            >
              All Places
            </a>
            <a
              routerLink="/explore-map"
              routerLinkActive="bg-purple-600/20 text-purple-300 border-purple-500/30"
              class="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent transition-all"
            >
              Live Map
            </a>
          </nav>

          <!-- Saved Places Pill with Badge -->
          <a
            routerLink="/saved"
            routerLinkActive="ring-2 ring-purple-500/50"
            class="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all"
          >
            <app-icon name="heart" [size]="15" class="text-rose-400"></app-icon>
            <span class="hidden sm:inline-block">Saved</span>
            @if (savedCount() > 0) {
              <span class="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {{ savedCount() }}
              </span>
            }
          </a>

          <!-- Profile / Settings -->
          <a
            routerLink="/profile"
            routerLinkActive="ring-2 ring-purple-500/50"
            class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
            aria-label="User Profile"
          >
            <app-icon name="user" [size]="18"></app-icon>
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  public readonly openSearch = output<void>();

  private readonly discoveryService = inject(DiscoveryService);
  private readonly bookmarkService = inject(BookmarkService);

  public readonly currentDistrict = this.discoveryService.currentDistrict;
  public readonly savedCount = () => this.bookmarkService.savedPlaceIds().length;
}
