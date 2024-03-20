import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventDetails } from '../types/event.type';
import { enviroment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { EventPhoto } from '../types/eventPhoto.type';
import { EventItem } from '../types/eventItem.type';
import { ApiResponse } from '../types/apiResponse.type';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  postEvent(formData: FormData): Observable<string> {
    return this.http.post<string>(enviroment.apiURL + '/admin/event', formData);
  }

  getEvent(id: string): Observable<EventDetails> {
    return this.http.get<EventDetails>(
      enviroment.apiURL + '/public/event/' + id
    );
  }

  getEventPhoto(): Observable<EventPhoto> {
    return this.http.get<EventPhoto>(enviroment.apiURL + '/public/event');
  }

  getEventsList(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(enviroment.apiURL + '/admin/events');
  }

  generateInvites(invites: number): Observable<any> {
    return this.http.post<any>(enviroment.apiURL + '/admin/invites', invites);
  }

  generateDiscount(eventId: string, value: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('eventId', eventId)
      .set('discountValue', value.toString());
    return this.http.post<ApiResponse>(
      enviroment.apiURL + '/admin/discount',
      null,
      {
        params,
      }
    );
  }

  applyPromocodeAndDiscount(code: string): Observable<ApiResponse> {
    const params = new HttpParams().set('code', code);
    return this.http.post<ApiResponse>(
      enviroment.apiURL + '/public/apply-promocode-or-discount',
      null,
      {
        params,
      }
    );
  }
}
