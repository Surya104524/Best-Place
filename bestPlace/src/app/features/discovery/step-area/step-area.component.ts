import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscoveryService } from '../../../core/services/discovery.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BreadcrumbStepperComponent, StepItem } from '../../../shared/components/breadcrumb-stepper/breadcrumb-stepper.component';
import { Area } from '../../../core/models/discovery.model';

@Component({
  selector: 'app-step-area',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, BreadcrumbStepperComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 min-h-screen">
      <!-- Breadcrumb Stepper -->
      <app-breadcrumb-stepper [steps]="stepperItems()"></app-breadcrumb-stepper>

      <!-- Header & Search Controls -->
      <div class="space-y-4 text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <span>STEP 02 OF 04 • {{ district().name }}</span>
        </div>
        <h1 class="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Select <span class="gradient-text-purple-cyan">Area / Sector</span>
        </h1>
        <p class="text-sm sm:text-base text-slate-300">
          Choose a neighborhood in {{ district().name }} to discover its distinct dining corridors, cafés, and viewpoints.
        </p>

        <!-- Search Bar & All Areas Shortcut -->
        <div class="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto pt-2">
          <div class="relative flex-grow w-full">
            <app-icon name="search" [size]="18" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400"></app-icon>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search area (e.g. R.S. Puram, Race Course, Peelamedu...)"
              class="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-slate-100 placeholder-slate-500 backdrop-blur-md"
            />
          </div>

          <button
            type="button"
            (click)="selectAllAreas()"
            class="w-full sm:w-auto flex-shrink-0 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/40 text-slate-200 hover:text-white text-xs font-semibold transition-all backdrop-blur-md whitespace-nowrap"
          >
            Explore Entire {{ district().name }}
          </button>
        </div>
      </div>

      <!-- Areas Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        @for (area of filteredAreas(); track area.id) {
          <div
            (click)="selectArea(area)"
            class="group relative rounded-3xl overflow-hidden bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.25)] flex flex-col justify-between aspect-[16/11]"
          >
            <!-- Background Image -->
            <img
              [src]="area.image"
              [alt]="area.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20"></div>

            <!-- Top Pill -->
            <div class="relative z-10 p-5 flex items-center justify-between">
              @if (area.isPopular) {
                <span class="px-3 py-1 rounded-full bg-purple-600/90 text-white text-xs font-semibold shadow-md backdrop-blur-md">
                  ★ High Energy Hub
                </span>
              } @else {
                <span></span>
              }

              <span class="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-medium text-purple-300">
                {{ area.vibe }}
              </span>
            </div>

            <!-- Bottom Content -->
            <div class="relative z-10 p-5 sm:p-6 space-y-2">
              <div class="flex items-end justify-between gap-2">
                <div>
                  <h3 class="font-display text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {{ area.name }}
                  </h3>
                  <p class="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {{ area.tagline }}
                  </p>
                </div>

                <div class="flex-shrink-0 w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <app-icon name="arrow-right" [size]="18"></app-icon>
                </div>
              </div>

              <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span class="font-semibold text-purple-300">{{ area.curatedPlacesCount }} Curated Places</span>
                <span class="text-[11px]">Select Vibe & Category →</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class StepAreaComponent implements OnInit {
  private readonly discoveryService = inject(DiscoveryService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public districtId = signal<string>('coimbatore');
  public searchQuery = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['district']) {
        this.districtId.set(params['district']);
        this.discoveryService.selectedDistrictId.set(params['district']);
      }
    });
  }

  public readonly district = computed(() => {
    return this.discoveryService.getDistrictById(this.districtId()) || this.discoveryService.districts()[0];
  });

  public readonly areas = computed(() => {
    const list = this.discoveryService.getAreasByDistrict(this.districtId());
    return list.length > 0 ? list : this.discoveryService.getAreasByDistrict('coimbatore');
  });

  public readonly filteredAreas = computed(() => {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.areas();
    return this.areas().filter(
      (a) => a.name.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q) || a.vibe.toLowerCase().includes(q)
    );
  });

  public readonly stepperItems = computed<StepItem[]>(() => [
    {
      stepNumber: 1,
      label: 'District',
      sublabel: this.district().name,
      route: ['/discover/districts'],
      isCompleted: true,
      isActive: false
    },
    {
      stepNumber: 2,
      label: 'Area / Sector',
      sublabel: 'Active',
      isCompleted: false,
      isActive: true
    },
    { stepNumber: 3, label: 'Category & Vibe', isCompleted: false, isActive: false },
    { stepNumber: 4, label: 'Curated Places', isCompleted: false, isActive: false }
  ]);

  public selectArea(area: Area): void {
    this.discoveryService.selectedAreaId.set(area.id);
    this.router.navigate(['/discover/categories'], {
      queryParams: { district: this.districtId(), area: area.id }
    });
  }

  public selectAllAreas(): void {
    this.discoveryService.selectedAreaId.set('all');
    this.router.navigate(['/discover/categories'], {
      queryParams: { district: this.districtId(), area: 'all' }
    });
  }
}
