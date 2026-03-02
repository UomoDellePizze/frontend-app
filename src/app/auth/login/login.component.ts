import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <div class="card">
        <div class="logo">🔐</div>
        <h1>Accedi</h1>
        <p>Verrai reindirizzato alla pagina di login sicura.</p>

        <button class="btn-primary" (click)="login()">
          Accedi con Keycloak
        </button>

        <div class="divider">oppure</div>

        <button class="btn-secondary" (click)="register()">
          Registrati
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
    }
    .card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 16px;
      padding: 48px 40px;
      width: 360px;
      text-align: center;
      color: #e6edf3;
    }
    .logo { font-size: 48px; margin-bottom: 16px; }
    h1 { margin: 0 0 8px; font-size: 24px; }
    p  { color: #8b949e; margin-bottom: 32px; font-size: 14px; }
    .btn-primary {
      width: 100%;
      padding: 12px;
      background: #4da6ff;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-primary:hover { background: #3a8fd9; }
    .divider {
      margin: 20px 0;
      color: #4a5568;
      font-size: 13px;
      position: relative;
    }
    .btn-secondary {
      width: 100%;
      padding: 12px;
      background: transparent;
      color: #4da6ff;
      border: 1px solid #4da6ff;
      border-radius: 8px;
      font-size: 15px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-secondary:hover { background: #4da6ff22; }
  `]
})
export class LoginComponent implements OnInit {

  constructor(
    private keycloak: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Se l'utente è già loggato, vai direttamente alla welcome page
    const isLogged = await this.keycloak.isLoggedIn();
    if (isLogged) {
      this.router.navigate(['/welcome']);
    }
  }

  login() {
    this.keycloak.login({ redirectUri: window.location.origin + '/welcome' });
  }

  register() {
    // Keycloak gestisce la pagina di registrazione
    this.keycloak.register({ redirectUri: window.location.origin + '/welcome' });
  }
}
