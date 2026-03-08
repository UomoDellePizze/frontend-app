import { Component, inject, OnInit, Query } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';
import { Welcome } from './welcome/welcome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Welcome],
  templateUrl: './app.html'
})
export class AppComponent{
  loggedIn = false;
  checking = true;
  private keycloak: any | null = null;
  constructor() {
    this.keycloak = inject(Keycloak);
  }


  login(): void {
    console.log("login");
    this.keycloak.login();        // redirect to Keycloak login page
  }

  logout(): void {
    console.log("logout");
    this.keycloak.logout();
  }
}
