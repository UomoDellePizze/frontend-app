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

  register() {
    this.router.navigate(['/register']);
  }
}
