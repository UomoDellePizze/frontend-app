import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent} from './app/app.component';
import { WelcomeComponent} from './app/welcome/welcome.component';
import { routes } from './app/app.routes';
import { provideKeycloak, ProvideKeycloakOptions } from 'keycloak-angular';
// ...existing code...
const keycloakConfig: ProvideKeycloakOptions = {
  config: {
    url: 'http://localhost:8080',
    realm: 'myapp',
    clientId: 'angular-client'
  },  initOptions: { onLoad: 'login-required' },

};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideKeycloak(keycloakConfig)
  ]
});
