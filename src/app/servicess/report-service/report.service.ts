import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportDTO } from 'src/app/models/ReportDTO';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

private baseUrl = 'http://localhost:8080/api/reports';

  constructor(
    private http: HttpClient
  ) { }

  reportTenant(reportData: ReportDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, reportData, {responseType: 'text'});
  }

  getAllReports(): Observable<ReportDTO[]> {
   return this.http.get<ReportDTO[]>(this.baseUrl);
  }

  deleteReport(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
 }

  
}
