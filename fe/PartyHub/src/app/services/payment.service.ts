import { Injectable } from '@angular/core';
import { PaymentDetails } from '../types/paymentDetails.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentDetailsKey = 'paymentDetails';

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
}
