import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  private keycloak = inject(Keycloak);
  private router = inject(Router);

  ngOnInit() {
    this.router.navigate(['/welcome']);
  }

  logout(): void {
    this.keycloak.logout();
  }
}
