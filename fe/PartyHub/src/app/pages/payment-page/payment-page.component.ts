import { Component, OnInit } from '@angular/core';
import { stripeConfig } from 'src/app/environments/environment.dev';
import { PaymentService } from 'src/app/services/payment.service';

declare var Stripe: any;

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent implements OnInit {
  stripe: any;
  elements: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  priceToPay!: number;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.priceToPay = this.paymentService.getPaymentPrice();
    this.stripe = Stripe(stripeConfig.apiKey);
    this.elements = this.stripe.elements();

    const elementStyles = {
      style: {
        base: {
          color: '#ffffff',
          lineHeight: '30px',
          fontFamily: 'sans-serif',
          fontSize: '20px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    };

    this.cardNumber = this.elements.create('cardNumber', elementStyles);
    this.cardNumber.mount('#card-number-element');

    this.cardExpiry = this.elements.create('cardExpiry', elementStyles);
    this.cardExpiry.mount('#card-expiry-element');

    this.cardCvc = this.elements.create('cardCvc', elementStyles);
    this.cardCvc.mount('#card-cvc-element');
  }

  async onSubmit() {
    const { token, error } = await this.stripe.createToken(this.cardNumber);

    if (error) {
      console.error(error.message);
    } else {
      console.log(token);
    }
  }
}
