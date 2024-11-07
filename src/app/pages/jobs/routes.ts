import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./jobs-page/jobs-page.component')
      .then(m => m.JobsPageComponent),
  },
]
