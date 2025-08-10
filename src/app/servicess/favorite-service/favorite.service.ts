import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from 'src/app/models/Property';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8080/api/favorites';

  constructor(private http:HttpClient) { }

 addFavorite(userId: number, propertyId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/add?userId=${userId}&propertyId=${propertyId}`, null, { responseType: 'text' });
 }

removeFavorite(userId: number, propertyId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/remove?userId=${userId}&propertyId=${propertyId}`, { responseType: 'text' });
}

  getFavoritesByUser(userId: number): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/user/${userId}`);
  }

}
