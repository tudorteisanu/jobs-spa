import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'jobs',
    loadChildren: () => import('./pages/jobs').then(m => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth').then(m => m.routes),
  },
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  }
];
