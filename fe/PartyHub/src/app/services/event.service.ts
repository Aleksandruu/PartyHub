import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventDetails } from '../types/event.type';
import { enviroment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { EventPhoto } from '../types/eventPhoto.type';
import { EventItem } from '../types/eventItem.type';
import { ApiResponse } from '../types/apiResponse.type';
import { EventStatistics } from '../types/eventStatistics.type';
import { EventPaymentDetails } from '../types/eventPaymentDetails.type';
import { Ticket } from '../types/ticket.type';
import { LOCALSTORAGEKEYS } from '../constants/localStorage';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  postEvent(formData: FormData): Observable<string> {
    return this.http.post<string>(enviroment.apiURL + '/admin/event', formData);
  }

  editEvent(formData: FormData, id: string): Observable<string> {
    return this.http.put<string>(
      enviroment.apiURL + '/admin/event/' + id,
      formData
    );
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

  generateInvites(invites: number, eventId: string): Observable<any> {
    return this.http.post<any>(
      enviroment.apiURL + '/admin/invites/' + eventId,
      invites
    );
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

  verifyTickets(code: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      enviroment.apiURL + '/scanner/validate/' + code,
      null
    );
  }

  getEventStatistics(eventId: string): Observable<EventStatistics> {
    return this.http.get<EventStatistics>(
      enviroment.apiURL + '/admin/event-statistics/' + eventId
    );
  }

  getEventPaymentDetails(eventId: string): Observable<EventPaymentDetails> {
    return this.http.get<EventPaymentDetails>(
      enviroment.apiURL + '/public/event-payment-details/' + eventId
    );
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      enviroment.apiURL +
        '/user/tickets/' +
        localStorage.getItem(LOCALSTORAGEKEYS.EMAIL)
    );
  }
}
