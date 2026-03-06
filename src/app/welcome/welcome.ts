import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
interface UserInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit {

  user: UserInfo | null = null;
  loading = true;
  error: string | null = null;

  private keycloak = inject(KeycloakService);
  private http = inject(HttpClient);


  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.loading = true;
    this.error = null;

    this.http.get<UserInfo>('http://localhost:8081/api/me').subscribe({
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
