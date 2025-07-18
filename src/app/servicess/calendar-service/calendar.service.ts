import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private apiUrl = 'http://localhost:8080/api/calendar-slots';

  constructor(private http: HttpClient) {}

  addCalendarSlot(calendarData: any): Observable<any> {
    return this.http.post(this.apiUrl, calendarData, {responseType: 'text'});
  }

  getSlotsByProperty(propertyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/property/${propertyId}`);
  }
}
