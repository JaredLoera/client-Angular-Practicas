import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../../models/token';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';
  private authTokenKey = 'authToken';

  constructor(private http:HttpClient) { }

  profile():Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`,{headers: {Authorization: `Bearer ${this.getAuthToken()}`}});
  }

  login(user:User):Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/login`, user);
  }

  logout():Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/logout`, {});
  }

  register(user:User):Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  setAuthToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.authTokenKey, token);
    }
  }

  getAuthToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.authTokenKey);
    }
    return null;
  }

  clearAuthToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.authTokenKey);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }
  verifyUser(id: number, signature: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/verify-mail/${id}?signature=${signature}`);
  }
  sendEmailConfirm(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/send-email-confirm`, {headers: {Authorization: `Bearer ${this.getAuthToken()}`}});
  }
}
