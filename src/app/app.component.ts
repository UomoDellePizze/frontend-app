import { Component, inject, OnInit, Query } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WelcomeComponent,RouterOutlet],          // we will show this when logged in
  templateUrl: './app.html',
  template: '<app-welcome></app-welcome><router-outlet></router-outlet>',
})
export class AppComponent{
  loggedIn = false;
  checking = true;   // optional – show a spinner while Keycloak responds
  private readonly keycloak = inject(Keycloak);


  login(): void {
    console.log("login");
    this.keycloak.login();        // redirect to Keycloak login page
  }

  logout(): void {
    console.log("logout");
    this.keycloak.logout();
  }
}
