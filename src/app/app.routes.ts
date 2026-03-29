import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Welcome } from './welcome/welcome';
import { Register } from './auth/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'api/auth/login',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: Welcome,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];
