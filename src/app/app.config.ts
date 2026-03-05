import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { provideKeycloak,KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { routes } from './app.routes';
import { keycloakConfig } from '../keycloak.config';

// Interceptor funzionale che aggiunge il Bearer token ad ogni richiesta
export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);

  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => {
      const token = keycloak.getKeycloakInstance().token;

      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }

      return next(req);
    })
  );
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([keycloakInterceptor])
    ),
    provideKeycloak({
    config: {
      url: 'http://localhost:8080',
      realm: 'myapp',
      clientId: 'angular-client' },
      initOptions: {
        onLoad: 'login-required'
      },
  }) ,
] ,
};
