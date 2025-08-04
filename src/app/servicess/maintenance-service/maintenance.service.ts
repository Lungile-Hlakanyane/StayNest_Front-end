import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaintenanceRequest } from 'src/app/models/MaintenanceRequest';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private apiUrl = 'http://localhost:8080/api/maintenance';

  constructor(
    private http: HttpClient
  ) { }

  createRequest(request: MaintenanceRequest): Observable<MaintenanceRequest> {
    return this.http.post<MaintenanceRequest>(this.apiUrl, request);
  }

  getAllRequests(): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(this.apiUrl);
  }
}
