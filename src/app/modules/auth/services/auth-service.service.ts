import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private cookie: CookieService, private router: Router, private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/signup`, { email, password });
  }

  logout(): void {
    this.cookie.delete('idToken', '/');
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
