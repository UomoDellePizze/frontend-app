import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import Keycloak from 'keycloak-js';
import { AuthService } from '../core/services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const keycloak = inject(Keycloak);
  const mydb = inject(AuthService);
  // Se Keycloak non inizializzato, inizializza
  if (!keycloak.authenticated && !keycloak.token) {
    await keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' });
  }
  return keycloak.authenticated && keycloak.token ? mydb.userExists(keycloak.tokenParsed?.sub as string).toPromise().then(() => true).catch(() => {
    console.log("Utente non esistente, logout");
    console.log(keycloak.idTokenParsed?.sub);
    keycloak.logout();
    return false;
  }) : false;
};
