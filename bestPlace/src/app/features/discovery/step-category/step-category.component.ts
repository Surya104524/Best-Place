import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscoveryService } from '../../../core/services/discovery.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BreadcrumbStepperComponent, StepItem } from '../../../shared/components/breadcrumb-stepper/breadcrumb-stepper.component';
import { Category } from '../../../core/models/discovery.model';

@Component({
  selector: 'app-step-category',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, BreadcrumbStepperComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 min-h-screen">
      <!-- Breadcrumb Stepper -->
      <app-breadcrumb-stepper [steps]="stepperItems()"></app-breadcrumb-stepper>

      <!-- Header -->
      <div class="space-y-4 text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <span>STEP 03 OF 04 • {{ currentContextLabel() }}</span>
        </div>
        <h1 class="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Select <span class="gradient-text-purple-cyan">Category / Vibe</span>
        </h1>
        <p class="text-sm sm:text-base text-slate-300">
          What type of atmosphere or experience are you craving? Choose a vibe to reveal curated dossiers.
        </p>

        <!-- Search Bar & All Categories Shortcut -->
        <div class="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto pt-2">
          <div class="relative flex-grow w-full">
            <app-icon name="search" [size]="18" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400"></app-icon>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search category (e.g. Cafés, Rooftops, Sunset, Stays...)"
              class="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-slate-100 placeholder-slate-500 backdrop-blur-md"
            />
          </div>

          <button
            type="button"
            (click)="selectAllCategories()"
            class="w-full sm:w-auto flex-shrink-0 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/40 text-slate-200 hover:text-white text-xs font-semibold transition-all backdrop-blur-md whitespace-nowrap"
          >
            All Categories
          </button>
        </div>
      </div>

      <!-- Category Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        @for (cat of filteredCategories(); track cat.id) {
          <div
            (click)="selectCategory(cat)"
            class="group relative rounded-3xl overflow-hidden bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.25)] flex flex-col justify-between p-6 sm:p-7 min-h-[220px]"
          >
            <!-- Background Image with Gradient Fade -->
            <img
              [src]="cat.image"
              [alt]="cat.name"
              class="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[1px] transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>

            <!-- Top Row: Emoji & Count -->
            <div class="relative z-10 flex items-start justify-between">
              <div class="text-4xl p-3 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                {{ cat.emoji }}
              </div>
              <span class="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-purple-300 font-mono">
                {{ cat.curatedPlacesCount }} Curated
              </span>
            </div>

            <!-- Bottom Content -->
            <div class="relative z-10 space-y-2 mt-6">
              <div class="flex items-end justify-between gap-2">
                <div>
                  <h3 class="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {{ cat.name }}
                  </h3>
                  <p class="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {{ cat.tagline }}
                  </p>
                </div>

                <div class="flex-shrink-0 w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <app-icon name="arrow-right" [size]="18"></app-icon>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class StepCategoryComponent implements OnInit {
  private readonly discoveryService = inject(DiscoveryService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public districtId = signal<string>('coimbatore');
  public areaId = signal<string>('rs-puram');
  public searchQuery = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['district']) {
        this.districtId.set(params['district']);
      }
      if (params['area']) {
        this.areaId.set(params['area']);
      }
    });
  }

  public readonly district = computed(() => {
    return this.discoveryService.getDistrictById(this.districtId()) || this.discoveryService.districts()[0];
  });

  public readonly area = computed(() => {
    if (this.areaId() === 'all') return { name: 'All Areas' };
    return this.discoveryService.getAreaById(this.areaId()) || { name: this.areaId() };
  });

  public readonly currentContextLabel = computed(() => {
    return `${this.district()?.name} • ${this.area()?.name}`;
  });

  public readonly categories = this.discoveryService.categories;

  public readonly filteredCategories = computed(() => {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.categories();
    return this.categories().filter(
      (c) => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
    );
  });

  public readonly stepperItems = computed<StepItem[]>(() => [
    {
      stepNumber: 1,
      label: 'District',
      sublabel: this.district()?.name,
      route: ['/discover/districts'],
      isCompleted: true,
      isActive: false
    },
    {
      stepNumber: 2,
      label: 'Area / Sector',
      sublabel: this.area()?.name,
      route: ['/discover/areas'],
      queryParams: { district: this.districtId() },
      isCompleted: true,
      isActive: false
    },
    {
      stepNumber: 3,
      label: 'Category & Vibe',
      sublabel: 'Active',
      isCompleted: false,
      isActive: true
    },
    { stepNumber: 4, label: 'Curated Places', isCompleted: false, isActive: false }
  ]);

  public selectCategory(cat: Category): void {
    this.discoveryService.selectedCategoryId.set(cat.id);
    this.router.navigate(['/places'], {
      queryParams: {
        district: this.districtId(),
        area: this.areaId(),
        category: cat.id
      }
    });
  }

  public selectAllCategories(): void {
    this.discoveryService.selectedCategoryId.set('all');
    this.router.navigate(['/places'], {
      queryParams: {
        district: this.districtId(),
        area: this.areaId(),
        category: 'all'
      }
    });
  }
}
