import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { stripeConfig } from 'src/app/environments/environment.dev';
import { PaymentService } from 'src/app/services/payment.service';
import { ApiResponse } from 'src/app/types/apiResponse.type';


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
  paymentInProgress: boolean = false;

  constructor(private paymentService: PaymentService, private router: Router) { }

  ngOnInit() {
    this.priceToPay = this.paymentService.getPaymentPrice();
    this.stripe = Stripe(stripeConfig.apiKey);
    this.elements = this.stripe.elements();

    const elementStyles = {
      style: {
        base: {
          color: '#ffffff',
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

  navigateToPaymentCancel(): void {
    this.router.navigate([PATHS.PAYMENTCANCEL]);
  }
  navigateToPaymentSucces(): void {
    this.router.navigate([PATHS.PAYMENTSUCCESS]);
  }

  async onSubmit() {
    if (this.paymentInProgress) {
      return;
    }

    this.paymentInProgress = true;

    try {

      const { token, error } = await this.stripe.createToken(this.cardNumber);

      if (error) {
        console.error(error.message);
        this.navigateToPaymentCancel();
      }
      else {
        const payment = this.paymentService.getPaymentDetails();
        payment!.token = token.id;

        this.paymentService.savePaymentDetails(payment!);
        this.paymentService.pay().subscribe(
          (res) => {
            if (res.success == true) {
              this.navigateToPaymentSucces();
            } else {
              this.navigateToPaymentCancel();
            }
          },
          (err) => {
            this.navigateToPaymentCancel();
          },
          () => {
            this.paymentInProgress = false;
          }
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
      this.navigateToPaymentCancel();
    }
  }
}
