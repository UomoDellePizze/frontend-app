import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';
import { Welcome } from './welcome/welcome';
import { CommonModule } from '@angular/common';
import { authGuard } from './guards/auth.guard';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit{
  loggedIn = false;
  checking = true;
  private keycloak=inject(Keycloak);
  private router=inject(Router);
  private authService=inject(AuthService);
  ngOnInit() {
    this.login();
  }
  login(): void {
    console.log("login");
    this.router.navigate(['/welcome']); // Call the login method with appropriate credentials
    //this.keycloak.login();        // redirect to Keycloak login page
  }

  logout(): void {
    console.log("logout");
    this.keycloak.logout();
  }
}
