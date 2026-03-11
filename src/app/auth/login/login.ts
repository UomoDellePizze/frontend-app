import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models/register-request.model';
@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  constructor(
    private router:Router,private authService: AuthService,private keycloak: Keycloak
){
    this.router=inject(Router);
    this.authService=inject(AuthService);
    this.keycloak=inject(Keycloak);
  }
    form: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  ngOnInit() {
    this.router.navigate(['/welcome']);
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
