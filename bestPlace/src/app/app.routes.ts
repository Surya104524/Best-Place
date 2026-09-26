import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'BEST PLACE',
  },
  {
    path: 'discover/districts',
    loadComponent: () =>
      import('./features/discovery/step-district/step-district.component').then(
        (m) => m.StepDistrictComponent,
      ),
    title: 'Select District — BEST PLACE',
  },
  {
    path: 'discover/areas',
    loadComponent: () =>
      import('./features/discovery/step-area/step-area.component').then((m) => m.StepAreaComponent),
    title: 'Select Area — BEST PLACE',
  },
  {
    path: 'discover/categories',
    loadComponent: () =>
      import('./features/discovery/step-category/step-category.component').then(
        (m) => m.StepCategoryComponent,
      ),
    title: 'Select Vibe & Category — BEST PLACE',
  },
  {
    path: 'places',
    loadComponent: () =>
      import('./features/discovery/curated-list/curated-list.component').then(
        (m) => m.CuratedListComponent,
      ),
    title: 'Curated Places — BEST PLACE',
  },
  {
    path: 'places/:slug',
    loadComponent: () =>
      import('./features/place-detail/place-detail.component').then((m) => m.PlaceDetailComponent),
    title: 'Place Dossier — BEST PLACE',
  },
  {
    path: 'saved',
    loadComponent: () =>
      import('./features/saved/saved-places.component').then((m) => m.SavedPlacesComponent),
    title: 'Saved Dossiers — BEST PLACE',
  },
  {
    path: 'explore-map',
    loadComponent: () =>
      import('./features/map-explore/map-explore.component').then((m) => m.MapExploreComponent),
    title: 'Interactive Map Explorer — BEST PLACE',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'Explorer Profile & Reservations — BEST PLACE',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
