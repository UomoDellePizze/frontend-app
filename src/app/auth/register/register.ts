import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RegisterRequest } from "../../core/models/register-request.model";
import { AuthService } from "../../core/services/auth.service";
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  form: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  private authService = inject(AuthService);

  register() {
    this.authService.register(this.form).subscribe({
      next: () => {
        alert("Registrazione completata");
      },
      error: () => {
        alert("Errore registrazione");
      }
    });
  }
}
