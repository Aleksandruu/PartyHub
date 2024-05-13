import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';

@Component({
  selector: 'app-payment-cancel-page',
  templateUrl: './payment-cancel-page.component.html',
  styleUrl: './payment-cancel-page.component.css',
})
export class PaymentCancelPageComponent {
  constructor(private router: Router) { }
  navigateToEvents(): void {
    this.router.navigate([PATHS.EVENTS]);
  }
}
