import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../models/user-info.model';
import Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private keycloak = inject(Keycloak);
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  user = signal<UserInfo | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  loadUser() {
    if(!this.keycloak.authenticated)
      return;

    this.loading.set(true);
    this.error.set(null);

    this.http.get<UserInfo>(`${this.api}/api/me`).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Errore caricamento utente');
        this.loading.set(false);
      }
    });
  }
}
