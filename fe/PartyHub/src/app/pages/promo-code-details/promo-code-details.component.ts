import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';

@Component({
  selector: 'app-promo-code-details',
  templateUrl: './promo-code-details.component.html',
  styleUrls: ['./promo-code-details.component.css'],
})
export class PromoCodeDetailsComponent {
  constructor(private router: Router) {}

  navigateToPromocode(): void {
    this.router.navigate([PATHS.PROMOCODE]);
  }
}
