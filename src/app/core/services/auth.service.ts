import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { RegisterRequest } from "../models/register-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest) {
    return this.http.post(`${this.api}/api/auth/register`, data);
  }
}
