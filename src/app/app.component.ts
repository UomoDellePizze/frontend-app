import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WelcomeComponent,RouterOutlet],          // we will show this when logged in
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  loggedIn = false;
  checking = true;   // optional – show a spinner while Keycloak responds

  constructor(private keycloak: KeycloakService) {}

  async ngOnInit() {
    // ask Keycloak for the current state
    this.loggedIn = await this.keycloak.isLoggedIn();
    this.checking = false;
  }

  login(): void {
    this.keycloak.login();        // redirect to Keycloak login page
  }

  logout(): void {
    this.keycloak.logout(window.location.origin);
  }
}
