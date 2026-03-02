import { KeycloakOptions } from 'keycloak-angular';

export const keycloakConfig: KeycloakOptions = {
  config: {
    url: 'http://localhost:8080',
    realm: 'myapp',
    clientId: 'angular-client',
  },
  initOptions: {
    onLoad: 'login-required'
  },
  bearerExcludedUrls: ['/assets'],
};
