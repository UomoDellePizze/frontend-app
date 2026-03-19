import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Welcome } from './welcome/welcome';
import { Login } from './auth/login/login';
import { inject } from '@angular/core/primitives/di';
import Keycloak from 'keycloak-js';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
    {
    path: 'login',

    component: Login
  },
  {
    path: 'api/auth/login',
    redirectTo: 'login',
  },
  {
    path: 'welcome',
    component: Welcome,
    // Rotta protetta: solo utenti autenticati possono accedere
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'welcome'
  },
];
