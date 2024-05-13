import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
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
import { MatIconModule } from '@angular/material/icon';
import { EventPaymentDetails } from 'src/app/types/eventPaymentDetails.type';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  event!: EventPaymentDetails;
  id!: string;
  notFound = false;
  discount = 0;
  price = 0;
  fewTickets = false;
  loggedIn = false;

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
    const email = localStorage.getItem(LOCALSTORAGEKEYS.EMAIL) || null;
    this.email = email;
    if (email != null) {
      this.loggedIn = true;
    }
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.eventService.getEventPaymentDetails(this.id).subscribe(
      (event) => {
        this.event = event;
        if (event.ticketsLeft <= (event.ticketsNumber * 20) / 100) {
          this.fewTickets = true;
        }
        this.initForm();
      },
      (error) => {
        this.notFound = true;
      }
    );
  }

  initForm(): void {
    this.ticketForm = new FormGroup({
      numberOfTickets: new FormControl(1, [
        Validators.required,
        this.positiveIntegerValidator(),
        Validators.max(this.event.ticketsLeft),
      ]),
      email: new FormControl(''),
    });

    this.discountForm = new FormGroup({
      discountCode: new FormControl(''),
    });
  }

  positiveIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        isNaN(control.value) ||
        control.value <= 0 ||
        !Number.isInteger(control.value)
      ) {
        return { positiveInteger: true };
      }
      return null;
    };
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

  onTicketsNumberChange(): void {
    if (this.discountForm.dirty) {
      this.applyPartyCode();
    }
  }

  onSubmit(): void {
    if (this.email == null) {
      this.email = this.ticketForm.value.email;
    }

    const payment: PaymentDetails = {
      token: '',
      tickets: this.ticketForm.value.numberOfTickets,
      userEmail: this.email!,
      referralEmail: this.referralEmail || '',
      discountCode: this.appliedCode || '',
      eventId: this.id,
    };

    this.paymentService.savePaymentDetails(payment);
    this.paymentService.savePaymentPrice(
      this.event.price * this.ticketForm.get('numberOfTickets')!.value -
        this.discount -
        (this.event.price * this.event.discountForNextTicket) / 100
    );
    this.router.navigate([PATHS.PAYMENT]);
  }
  navigateToPromoCodeDetails(): void {
    this.router.navigate([PATHS.PROMOCODEDETAILS]);
  }
}
