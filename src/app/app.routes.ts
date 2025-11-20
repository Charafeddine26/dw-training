import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./feature/hero-list/hero-list.component').then(m => m.HeroListComponent)
  },
  {
    path: 'hero/new',
    loadComponent: () => import('./feature/hero-form/hero-form.component').then(m => m.HeroFormComponent)
  },
  {
    path: 'hero/edit/:id',
    loadComponent: () => import('./feature/hero-form/hero-form.component').then(m => m.HeroFormComponent)
  }
];