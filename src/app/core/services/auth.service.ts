import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { RegisterRequest } from "../models/register-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl;

  private http = inject(HttpClient);
  userExists(id: string) {
    return this.http.get(`${this.api}/api/users/${id}`);
  }

  register(data: RegisterRequest) {
    return this.http.post(`${this.api}/api/users`, data);
  }
}
