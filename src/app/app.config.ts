import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { provideKeycloak } from 'keycloak-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import Keycloak from 'keycloak-js';


// Interceptor funzionale che aggiunge il Bearer token ad ogni richiesta
export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(Keycloak);

  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => {
      const token = keycloak.token;

      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }

      return next(req);
    })
  );
};


// keycloak.ts
export function initializeKeycloak() { return async () =>{await keycloak.init({ onLoad: 'login-required' }).catch((error) => { console.error('Error initializing Keycloak:', error); });} }
export const keycloak = new Keycloak({
  url: environment.keycloakUrl,
  realm: environment.realm,
  clientId: environment.clientId,
});

export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(
      withInterceptors([keycloakInterceptor])
    ),

    { provide: Keycloak, useValue: keycloak },

    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true
    },

    provideRouter(routes)

  ]
};
