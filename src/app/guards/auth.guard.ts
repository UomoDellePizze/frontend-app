import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import Keycloak from 'keycloak-js';

export const authGuard: CanActivateFn = async () => {
  const keycloak = inject(Keycloak);

  // Se Keycloak non inizializzato, inizializza
  if (!keycloak.authenticated) {
    await keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' });
  }

  return keycloak.authenticated;
};
