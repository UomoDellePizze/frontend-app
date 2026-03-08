import { Routes } from '@angular/router';
import { canActivateAuthRole } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then((m) => m.Login),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome').then((m) => m.Welcome),
    // Rotta protetta: solo utenti autenticati possono accedere
     canActivate: [canActivateAuthRole],
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
