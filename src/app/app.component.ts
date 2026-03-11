import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';
import { Welcome } from './welcome/welcome';
import { CommonModule } from '@angular/common';
import { authGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterModule,Welcome],
  templateUrl: './app.html'
})
export class AppComponent{
  loggedIn = false;
  checking = true;
  private keycloak=inject(Keycloak);

  login(): void {
    console.log("login");
    this.keycloak.login();        // redirect to Keycloak login page
  }

  logout(): void {
    console.log("logout");
    this.keycloak.logout();
  }
}
