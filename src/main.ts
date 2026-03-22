// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig} from './app/app.config';
import Keycloak from 'keycloak-js';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch(err => console.error(err));
