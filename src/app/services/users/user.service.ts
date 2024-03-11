import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient,private authService:AuthService) { }
  private baseUrl = 'http://localhost:8000';
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`,{headers: {Authorization: `Bearer ${this.authService.getAuthToken()}`}});
  }
}
