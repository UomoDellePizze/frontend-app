import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { routes } from './app.routes';
import { keycloakConfig } from '../keycloak.config';

// Interceptor funzionale che aggiunge il Bearer token ad ogni richiesta
function keycloakInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const keycloak = new KeycloakService();
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

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    if (typeof window === 'undefined') return Promise.resolve();
    return keycloak.init(keycloakConfig).then(() => {
      // Salva l'istanza Keycloak globalmente per l'interceptor
      (window as any).__keycloak_instance = (keycloak as any)._instance;
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([keycloakInterceptor])),
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
};
