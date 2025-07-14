import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from 'src/app/models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = 'http://localhost:8080/api/properties';

  constructor(private http:HttpClient) { }

  addProperty(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData, {responseType: 'text'});
  }

  getAllProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  countPropertiesByUserId(userId: number): Observable<number> {
   return this.http.get<number>(`${this.apiUrl}/count/${userId}`);
 }

  getPropertiesByUserId(userId: number): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/user/${userId}`);
  }

 deleteProperty(propertyId: number): Observable<any> {
  return this.http.delete(`http://localhost:8080/api/properties/${propertyId}`, {responseType: 'text'});
 }

 getPropertyById(id: number) {
    return this.http.get<Property>(`http://localhost:8080/api/properties/${id}`);
 }

updateProperty(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, formData, {responseType: 'text'});
}

}
