import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDTO } from 'src/app/models/CommentDTO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http:HttpClient) { }

  addComment(comment: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(this.apiUrl, comment);
  }

  getCommentsByProperty(propertyId: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.apiUrl}/property/${propertyId}`);
  }

}
