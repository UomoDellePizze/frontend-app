import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Keycloak from 'keycloak-js';
import { HttpClient } from '@angular/common/http';

interface UserInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
      <nav class="navbar">
        <span class="brand">🔐 MyApp</span>
        <button class="btn-logout" (click)="logout()">Esci</button>
      </nav>

      <main class="content">
        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
          <p>Caricamento...</p>
        </div>

        <div *ngIf="!loading && user" class="card">
          <div class="avatar">{{ getInitials() }}</div>
          <h1>Benvenuto, {{ user.firstName || user.username }}! 👋</h1>
          <p class="subtitle">Accesso effettuato con successo</p>

          <div class="info-grid">
            <div class="info-item">
              <span class="label">Username</span>
              <span class="value">{{ user.username }}</span>
            </div>
            <div class="info-item">
              <span class="label">Email</span>
              <span class="value">{{ user.email }}</span>
            </div>
            <div *ngIf="user.firstName" class="info-item">
              <span class="label">Nome</span>
              <span class="value">{{ user.firstName }} {{ user.lastName }}</span>
            </div>
          </div>

          <div class="badge">
            <span>✅ Autenticato via Keycloak</span>
          </div>
        </div>

        <div *ngIf="error" class="error-card">
          <p>{{ error }}</p>
          <button class="btn-retry" (click)="loadUserInfo()">Riprova</button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; }

    .welcome-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
      color: #e6edf3;
      font-family: 'Segoe UI', sans-serif;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 32px;
      background: #161b22;
      border-bottom: 1px solid #30363d;
    }
    .brand { font-size: 18px; font-weight: 700; }
    .btn-logout {
      background: transparent;
      color: #f87171;
      border: 1px solid #f87171;
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }
    .btn-logout:hover { background: #f8717122; }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 65px);
      padding: 32px 16px;
    }
    .card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 20px;
      padding: 48px 40px;
      width: 460px;
      text-align: center;
    }
    .avatar {
      width: 72px; height: 72px;
      background: linear-gradient(135deg, #4da6ff, #6db33f);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 700;
      margin: 0 auto 24px;
    }
    h1 { margin: 0 0 8px; font-size: 26px; }
    .subtitle { color: #8b949e; margin: 0 0 32px; font-size: 14px; }

    .info-grid {
      background: #0d1117;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #21262d;
    }
    .info-item:last-child { border-bottom: none; }
    .label { color: #8b949e; font-size: 13px; }
    .value { color: #e6edf3; font-size: 13px; font-weight: 600; }

    .badge {
      background: #1a2a1a;
      border: 1px solid #6db33f44;
      border-radius: 8px;
      padding: 10px;
      font-size: 13px;
      color: #6db33f;
    }

    .loading {
      text-align: center;
      color: #8b949e;
    }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid #30363d;
      border-top-color: #4da6ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .error-card {
      background: #1a0505;
      border: 1px solid #f8717144;
      border-radius: 12px;
      padding: 24px;
      color: #f87171;
      text-align: center;
    }
    .btn-retry {
      margin-top: 12px;
      background: #f87171;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px 20px;
      cursor: pointer;
    }
  `]
})
export class WelcomeComponent implements OnInit {

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
