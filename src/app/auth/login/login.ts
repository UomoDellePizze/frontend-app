import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  private router = inject(Router);
  private keycloak = inject(Keycloak);

  form = {
    username: '',
    password: ''
  };

  ngOnInit() {}

  login() {
    this.keycloak.login();
  }

  register() {
    this.router.navigate(['/register']);
  }
}
