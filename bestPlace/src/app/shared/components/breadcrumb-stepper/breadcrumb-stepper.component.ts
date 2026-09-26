import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

export interface StepItem {
  stepNumber: number;
  label: string;
  sublabel?: string;
  route?: any[];
  queryParams?: Record<string, any>;
  isCompleted: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-breadcrumb-stepper',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="w-full py-3.5 px-4 sm:px-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
      <div class="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
        @for (step of steps(); track step.stepNumber; let isLast = $last) {
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- Step Item -->
            @if (step.route && (step.isCompleted || step.isActive)) {
              <a
                [routerLink]="step.route"
                [queryParams]="step.queryParams || {}"
                class="flex items-center gap-2 group transition-all"
              >
                <!-- Number / Check circle -->
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  [class]="step.isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.5)] ring-2 ring-purple-400/50'
                    : step.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'"
                >
                  @if (step.isCompleted) {
                    <app-icon name="check" [size]="14"></app-icon>
                  } @else {
                    <span>{{ step.stepNumber }}</span>
                  }
                </div>

                <!-- Label -->
                <div class="flex flex-col">
                  <span
                    class="text-xs font-semibold tracking-tight transition-colors"
                    [class]="step.isActive
                      ? 'text-purple-300'
                      : step.isCompleted
                        ? 'text-slate-200 group-hover:text-white'
                        : 'text-slate-500'"
                  >
                    {{ step.label }}
                  </span>
                  @if (step.sublabel) {
                    <span class="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
                      {{ step.sublabel }}
                    </span>
                  }
                </div>
              </a>
            } @else {
              <div class="flex items-center gap-2 opacity-50 cursor-not-allowed">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-slate-800 text-slate-500">
                  <span>{{ step.stepNumber }}</span>
                </div>
                <span class="text-xs font-medium text-slate-500">{{ step.label }}</span>
              </div>
            }

            <!-- Connector arrow -->
            @if (!isLast) {
              <app-icon name="chevron-right" [size]="14" class="text-slate-600 mx-1 flex-shrink-0"></app-icon>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class BreadcrumbStepperComponent {
  steps = input.required<StepItem[]>();
}
