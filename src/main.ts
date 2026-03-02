import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideKeycloak, ProvideKeycloakOptions } from 'keycloak-angular';

const keycloakConfig: ProvideKeycloakOptions = {
  config: {
    url: 'http://localhost:8080',
    realm: 'myapp',
    clientId: 'angular-client'
  }
};

bootstrapApplication(AppComponent, {
  providers: [
    provideKeycloak(keycloakConfig)
    // …add provideRouter(routes) here if you ever switch to routing
  ]
});
