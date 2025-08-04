import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/models/Announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private apiUrl = 'http://localhost:8080/api/announcements';

  constructor(
    private http: HttpClient
  ) { }

   sendAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, announcement);
  }

  fetchAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl);
  }
}
