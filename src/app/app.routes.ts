import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Welcome } from './welcome/welcome';
import { Login } from './auth/login/login';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
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
