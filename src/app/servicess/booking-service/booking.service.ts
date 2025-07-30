import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Booking} from '../../models/Booking';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor( private http: HttpClient) { }

  getBookingsByLandlordId(landlordId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/landlord/${landlordId}`);
  }
}
