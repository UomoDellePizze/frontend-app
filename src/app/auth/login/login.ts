import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private keycloak = inject(KeycloakService);
  private router = inject(Router);
  async ngOnInit() {
    this.router.navigate(['/welcome']);
  }

  login() {
    this.keycloak.login({ redirectUri: window.location.origin + '/welcome' });
  }

  register() {
    // Keycloak gestisce la pagina di registrazione
    this.keycloak.register({ redirectUri: window.location.origin + '/welcome' });
  }
}
