import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import Keycloak from 'keycloak-js';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../auth/login/login';
import { AuthService } from '../core/services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const keycloak = inject(Keycloak);
  const authService = inject(AuthService);
  const api = environment.apiUrl;

  // Quando la guard scatta, Keycloak ha già fatto il login
  // tramite onLoad: 'login-required' in app.config.ts
  if (!keycloak.authenticated || !keycloak.token) {
    return false;
  }

  const sub = keycloak.tokenParsed?.['sub'] as string;
  const username = keycloak.tokenParsed?.['preferred_username'] as string;
  const login = new Login();
  login.form.sub = sub;
  login.form.username = username;
  console.log(login.form);
  try {
    await firstValueFrom(
      authService.userExists(`${api}/api/users/${login.form.sub}`)
    );
    console.log("Utente loggato");
    return true;

  } catch (err: any) {
    console.warn('Utente non trovato nel DB, logout:', {err: err.status, login: login.form});
    await keycloak.logout();
    return false;
  }
};
