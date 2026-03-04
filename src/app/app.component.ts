import { Component, inject, OnInit, Query } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  template: '<router-outlet></router-outlet>',
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
