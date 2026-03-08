import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models/register-request.model';
@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private keycloak = inject(Keycloak);
    form: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  async ngOnInit() {
    //this.router.navigate(['']);
  }

  login() {
    this.keycloak.login({ redirectUri: window.location.origin + '/welcome' });
  }

  register() {
    this.authService.register(this.form).subscribe({
      next: () => {
        alert("Registrazione completata");
      },
      error: () => {
        alert("Errore registrazione");
      }
    });
  }
}
