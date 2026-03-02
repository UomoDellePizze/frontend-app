import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  /**
   * Chiamato automaticamente da KeycloakAuthGuard.
   * Se l'utente non è autenticato: redirect a Keycloak.
   */
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    if (!this.authenticated) {
      // Redirige a Keycloak, dopo il login torna all'URL originale
      await this.keycloak.login({ redirectUri: window.location.origin + state.url });
      return false;
    }

    return true;
  }
}
