import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
interface UserInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css'],
})
export class Welcome implements OnInit {

  user: UserInfo | null = null;
  loading = true;
  error: string | null = null;

  private keycloak = inject(Keycloak);
  private http = inject(HttpClient);


  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.loading = true;
    this.error = null;

    this.http.get<UserInfo>(environment.apiUrl + '/api/me').subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossibile caricare i dati utente. Riprova.';
        this.loading = false;
        console.error('Errore API:', err);
      }
    });
  }

  getInitials(): string {
    if (this.user?.firstName) {
      return (this.user.firstName[0] + (this.user.lastName?.[0] || '')).toUpperCase();
    }
    return this.user?.username?.[0]?.toUpperCase() || '?';
  }

  logout() {
    this.keycloak.logout();
  }

}
