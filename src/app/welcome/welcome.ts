import { Component, inject, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class Welcome implements OnInit {
  private keycloak = inject(Keycloak);
  userService = inject(UserService);

  user = this.userService.user;
  loading = this.userService.loading;
  error = this.userService.error;

  ngOnInit() {
    this.userService.loadUser();
  }

  logout() {
    this.keycloak.logout();
  }

  getInitials(): string {
    const u = this.user();

    if (u?.firstName) {
      return (u.firstName[0] + (u.lastName?.[0] || '')).toUpperCase();
    }

    return u?.username?.[0]?.toUpperCase() || '?';
  }
}
