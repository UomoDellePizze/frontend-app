import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { provideKeycloak } from 'keycloak-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { routes } from './app.routes';
import { keycloakConfig } from '../keycloak.config';

// Interceptor funzionale che aggiunge il Bearer token ad ogni richiesta
function keycloakInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const instance = (window as any).__keycloak_instance;

  if (!instance) return next(req);

  return from(instance.updateToken(30)).pipe(
    switchMap(() => {
      const token = instance.token;
      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
      return next(req);
    })
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
    config: {
      url: 'http://localhost:8080',
      realm: 'myapp',
      clientId: 'angular-client' },
      initOptions: {
        onLoad: 'login-required' ,
      } ,
  }) ,
] ,
};
