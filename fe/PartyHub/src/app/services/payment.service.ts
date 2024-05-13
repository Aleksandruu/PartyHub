import { Injectable } from '@angular/core';
import { PaymentDetails } from '../types/paymentDetails.type';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/apiResponse.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentDetailsKey = 'paymentDetails';

  constructor(private http: HttpClient) {}

  savePaymentDetails(details: PaymentDetails): void {
    localStorage.setItem(this.paymentDetailsKey, JSON.stringify(details));
  }

  getPaymentDetails(): PaymentDetails | undefined {
    return JSON.parse(localStorage.getItem(this.paymentDetailsKey)!);
  }

  savePaymentPrice(price: number): void {
    localStorage.setItem('paymentPrice', JSON.stringify(price));
  }

  getPaymentPrice(): number {
    return JSON.parse(localStorage.getItem('paymentPrice')!);
  }

  pay(): Observable<ApiResponse> {
    const payment = JSON.parse(localStorage.getItem(this.paymentDetailsKey)!);
    console.log(payment);
    return this.http.post<ApiResponse>(
      enviroment.apiURL + '/payment/charge',
      payment
    );
  }
}
