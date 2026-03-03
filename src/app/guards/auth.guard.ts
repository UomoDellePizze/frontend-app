import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';
export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const keycloak = inject(Keycloak);

  const loggedIn = false;

  if (!loggedIn) {
    await keycloak.login();
    return false;
  }
  return true;
};
