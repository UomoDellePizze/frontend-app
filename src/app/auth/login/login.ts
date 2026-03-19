import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  private router=inject(Router);
  private authService=inject(AuthService);
  form = {
    username: '',
    password: ''
  };

  ngOnInit() {

  }

  login() {
    this.authService.login(this.form).subscribe({
      next: () => {
        console.log("Login effettuato con successo");
        this.router.navigate(['/welcome']);
      },
      error: () => {
        alert("Errore durante il login");
      }
    });
  }
  register() {
    this.router.navigate(['/register']);
  }
}
