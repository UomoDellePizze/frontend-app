// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app/app.component';
import { authInterceptor, keycloak } from './app/app.config';
import Keycloak from 'keycloak-js';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export function initializeKeycloak() {
  return async () =>{await keycloak.init({ onLoad: 'login-required' });}
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: Keycloak, useValue: keycloak },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true
    }
  ]
});
