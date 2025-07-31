import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDTO } from 'src/app/models/MessageDTO';
import { Message } from 'src/app/models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baserUrl = 'http://localhost:8080/api/messages';

  constructor(private http:HttpClient) { }

  sendMessage(message: MessageDTO): Observable<Message> {
    return this.http.post<Message>(`${this.baserUrl}/send`, message);
  }

  getChatHistory(user1Id: number, user2Id: number): Observable<Message[]> {
    const params = new HttpParams()
      .set('user1Id', user1Id)
      .set('user2Id', user2Id);
    return this.http.get<Message[]>(`${this.baserUrl}/history`, { params });
  }

 getMessagesForReceiver(receiverId: number): Observable<Message[]> {
   return this.http.get<Message[]>(`${this.baserUrl}/inbox/${receiverId}`);
 }

}
