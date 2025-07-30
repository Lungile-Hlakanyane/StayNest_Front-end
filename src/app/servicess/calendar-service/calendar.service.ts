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

bookSlot(slotId: number, userId: number) {
    return this.http.post('http://localhost:8080/api/calendar-slots/book', {slotId, userId}, {responseType: 'text'});
 }


getSlotsByUserId(): Observable<any[]> {
  const userStr = localStorage.getItem('user');
  const userId = userStr ? Number(userStr) : null;
  if (!userId) {
    throw new Error('User ID not found in local storage');
  }
  return this.http.get<any[]>(`http://localhost:8080/api/calendar-slots/slots/user/${userId}`);
}

getSlotCountByLandlordId(landlordId: number): Observable<number> {
  return this.http.get<number>(`http://localhost:8080/api/calendar-slots/count/landlord/${landlordId}`);
}


}
