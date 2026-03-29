import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: environment.keycloakUrl,
  realm: environment.realm,
  clientId: environment.clientId,
});

// Aggiunge Bearer token a ogni richiesta se autenticato
export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
  const kc = inject(Keycloak);

  if (!kc.authenticated) {
    return next(req);
  }

  return from(kc.updateToken(30)).pipe(
    switchMap(() => {
      if (kc.token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${kc.token}` }
        });
      }
      return next(req);
    })
  );
};

// onLoad: 'login-required' → Keycloak reindirizza al login se non autenticato
// e torna su Angular con il token già pronto
export function initializeKeycloak() {
  return async () => {
    try {
      await keycloak.init({
        onLoad: 'login-required',
        pkceMethod: 'S256'
      });
    } catch (error) {
      console.error('Errore inizializzazione Keycloak:', error);
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([keycloakInterceptor])),
    { provide: Keycloak, useValue: keycloak },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true
    },
    provideRouter(routes)
  ]
};
