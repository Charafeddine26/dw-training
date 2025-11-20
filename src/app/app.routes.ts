import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./feature/hero-list/hero-list.component').then(m => m.HeroListComponent)
  }
];
