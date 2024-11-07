import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./UI/login-page/login-page.component')
      .then(m => m.LoginPageComponent),
  }
]
