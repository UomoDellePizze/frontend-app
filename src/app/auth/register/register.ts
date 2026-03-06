import { Component } from "@angular/core";
import { RegisterRequest } from "../../core/models/register-request.model";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  constructor(private authService: AuthService) {}

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
