import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'jobs',
    loadChildren: () => import('./pages/jobs').then(m => m.routes),
  }
];
