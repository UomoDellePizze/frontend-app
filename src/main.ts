import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent} from './app/app.component';
import { routes } from './app/app.routes';
import { provideKeycloak, ProvideKeycloakOptions } from 'keycloak-angular';
import { KeycloakService } from 'keycloak-angular';
import { keycloakInterceptor } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const keycloak = new KeycloakService();

await keycloak.init({
  config: {
    url: 'http://localhost:8080',
    realm: 'myapp',
    clientId: 'angular-client'
  },
  initOptions: { onLoad: 'login-required' }
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
      provideHttpClient(withInterceptors([keycloakInterceptor])),
    { provide: KeycloakService, useValue: keycloak }
  ]
});

