import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/UserDTO';
import { ChangePasswordPayload } from 'src/app/models/ChangePasswordPayload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http:HttpClient) { }

  register(user: UserDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify?token=${token}`, { responseType: 'text' });
  }

  login(email: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { headers });
  }

  getUserById(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/user/${userId}`);
  }

  changePassword(payload: ChangePasswordPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, payload, {responseType: 'text'});
  }

  updateProfile(payload: { userId: number; fullName: string; phoneNumber: string }): Observable<any> {
   return this.http.put(`${this.apiUrl}/update-profile`, payload, { responseType: 'text' });
  }

  getUserCount(): Observable<number> {
   return this.http.get<number>(`${this.apiUrl}/users/count`);
  }

  
}
