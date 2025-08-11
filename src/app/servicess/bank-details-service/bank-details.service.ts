import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {

  private apiUrl = 'http://localhost:8080/api/cards'; 

  constructor(private http:HttpClient) { }

  saveBankDetails(details: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, details, {responseType: 'text'});
  }

  getBankDetailsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cardId}`, {responseType: 'text'});
  }

}
