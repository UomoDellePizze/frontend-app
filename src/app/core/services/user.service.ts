import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.apiUrl;

  private http = inject(HttpClient);

  getMe(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.api}/api/me`);
  }
}
