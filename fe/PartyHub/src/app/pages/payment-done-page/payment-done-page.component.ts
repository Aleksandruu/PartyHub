import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import party from "party-js";
import { PATHS } from 'src/app/constants/paths';

@Component({
  selector: 'app-payment-done-page',
  templateUrl: './payment-done-page.component.html',
  styleUrl: './payment-done-page.component.css',
})
export class PaymentDonePageComponent implements AfterViewInit {
  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.confetti();
  }
  confetti(): void {
    const container = document.getElementById('confetti-container');
    if (container) {
      party.confetti(container, {
        count: party.variation.range(100, 200),
      });
    }
  }
  navigateToEvents(): void {
    this.router.navigate([PATHS.EVENTS]);
  }

}
