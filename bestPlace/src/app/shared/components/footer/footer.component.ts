import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DiscoveryService } from '../../../core/services/discovery.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <footer class="w-full bg-slate-950 border-t border-slate-800/80 pt-16 pb-28 md:pb-16 text-slate-400 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          <!-- Col 1: Brand & Philosophy -->
          <div class="space-y-4 md:col-span-1">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-md">
                <div class="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <app-icon name="compass" [size]="16" class="text-cyan-400"></app-icon>
                </div>
              </div>
              <span class="font-display font-black text-lg text-white">
                BEST<span class="text-purple-400">PLACE</span>
              </span>
            </div>
            <p class="text-slate-400 leading-relaxed">
              Discover the Best. Experience the Best. A strictly curated discovery platform highlighting only verified exceptional places.
            </p>
            <div class="text-[11px] text-purple-400 font-semibold uppercase tracking-wider">
              Less searching • Better places
            </div>
          </div>

          <!-- Col 2: Districts -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200">Curated Districts</h4>
            <ul class="space-y-2">
              @for (dist of districts(); track dist.id) {
                <li>
                  <a
                    [routerLink]="['/discover/areas']"
                    [queryParams]="{ district: dist.id }"
                    class="hover:text-purple-300 transition-colors flex items-center justify-between"
                  >
                    <span>{{ dist.name }}</span>
                    <span class="text-[11px] text-slate-400 font-mono">{{ dist.curatedPlacesCount }}</span>
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Col 3: Categories -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200">Vibes & Categories</h4>
            <ul class="space-y-2">
              @for (cat of categories(); track cat.id) {
                <li>
                  <a
                    [routerLink]="['/places']"
                    [queryParams]="{ category: cat.id }"
                    class="hover:text-purple-300 transition-colors flex items-center gap-2"
                  >
                    <span>{{ cat.emoji }}</span>
                    <span>{{ cat.name }}</span>
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Col 4: Curation Standards -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200">Curator Standards</h4>
            <p class="text-slate-400 leading-relaxed text-[11px]">
              Every place featured on BEST PLACE passes a 5-pillar verification process: Atmosphere & Acoustics, Ergonomic Comfort & Wi-Fi Speed, Product Quality & Consistency, Service & Hospitality, and Visual Distinction.
            </p>
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <span class="text-emerald-400 font-semibold">100% Unbiased</span> • No paid promotional ranking.
            </div>
          </div>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 BEST PLACE. All rights reserved. Designed for discerning explorers.
          </div>
          <div class="flex items-center gap-4">
            <a routerLink="/" class="hover:text-slate-200">Privacy Policy</a>
            <a routerLink="/" class="hover:text-slate-200">Terms of Service</a>
            <a routerLink="/discover/districts" class="hover:text-slate-200">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private readonly discoveryService = inject(DiscoveryService);
  public readonly districts = this.discoveryService.districts;
  public readonly categories = this.discoveryService.categories;
}
