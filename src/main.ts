import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent} from './app/app.component';
import { routes } from './app/app.routes';
import { provideKeycloak, ProvideKeycloakOptions } from 'keycloak-angular';
import { KeycloakService } from 'keycloak-angular';
import { keycloakInterceptor } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  providers: [

    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'myapp',
        clientId: 'angular-client' },
        initOptions: {
          onLoad: 'login-required'
        },

      }),
      provideRouter(routes),
      provideHttpClient(withInterceptors([keycloakInterceptor])),
  ]
});

