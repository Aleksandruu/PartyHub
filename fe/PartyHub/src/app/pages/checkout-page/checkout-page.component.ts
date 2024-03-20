import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ROUTES, Router } from '@angular/router';
import { LOCALSTORAGEKEYS } from 'src/app/constants/localStorage';
import { PATHS } from 'src/app/constants/paths';
import { EventService } from 'src/app/services/event.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ApiResponse } from 'src/app/types/apiResponse.type';
import { EventDetails } from 'src/app/types/event.type';
import { PaymentDetails } from 'src/app/types/paymentDetails.type';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  event!: EventDetails;
  id!: string;
  notFound = false;
  discount = 0;
  price = 0;

  ticketForm!: FormGroup;
  discountForm!: FormGroup;

  email!: string | null;

  appliedCode!: string | null;
  referralEmail!: string | null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem(LOCALSTORAGEKEYS.EMAIL) || null;

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.eventService.getEvent(this.id).subscribe(
      (event) => {
        this.event = event;
      },
      (error) => {
        this.notFound = true;
      }
    );

    this.ticketForm = new FormGroup({
      numberOfTickets: new FormControl(),
      email: new FormControl(''),
    });

    this.discountForm = new FormGroup({
      discountCode: new FormControl(''),
    });
  }

  applyPartyCode() {
    const code = this.discountForm.value.discountCode;
    this.eventService
      .applyPromocodeAndDiscount(code)
      .subscribe((response: ApiResponse) => {
        if (response.message.length <= 3) {
          this.appliedCode = code;
          this.referralEmail = '';
          this.discount =
            (this.event.price * JSON.parse(response.message)) / 100;
        } else {
          this.referralEmail = response.message;
          this.appliedCode = '';
          this.discount =
            (this.event.price *
              this.event.discount *
              this.ticketForm.value.numberOfTickets) /
            100;
        }
      });
  }

  onSubmit(): void {
    if (this.email == null) {
      this.email = this.ticketForm.value.email;
    }

    const payment: PaymentDetails = {
      token: '',
      tickets: this.ticketForm.value.numberOfTickets,
      userEmail: this.email!,
      referalEmail: this.referralEmail || '',
      discountCode: this.appliedCode || '',
    };

    this.paymentService.savePaymentDetails(payment);
    this.paymentService.savePaymentPrice(
      this.event.price * this.ticketForm.get('numberOfTickets')!.value -
        this.discount
    );
    this.router.navigate([PATHS.PAYMENT]);
  }
}
