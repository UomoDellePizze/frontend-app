import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {

  const keycloak = inject(Keycloak);

  if (!keycloak.authenticated) {
    return next(req);
  }

  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => {

      const token = keycloak.token;

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next(req);
    })
  );
};
