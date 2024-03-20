import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateToPromo(): void {
    this.router.navigate([PATHS.PROMOCODEDETAILS]);
  }
}
