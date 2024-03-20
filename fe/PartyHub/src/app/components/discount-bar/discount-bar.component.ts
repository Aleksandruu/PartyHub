import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-discount-bar',
  templateUrl: './discount-bar.component.html',
  styleUrl: './discount-bar.component.css',
})
export class DiscountBarComponent {
  @Input() discount!: number;
}
