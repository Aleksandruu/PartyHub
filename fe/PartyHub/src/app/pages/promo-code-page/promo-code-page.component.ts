import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { timeout } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import party from "party-js";

@Component({
  selector: 'app-promo-code-page',
  templateUrl: './promo-code-page.component.html',
  styleUrls: ['./promo-code-page.component.css'],
})
export class PromoCodePageComponent {
  promoCode!: string;
  promoCodeForm!: FormGroup;
  invalid = false;
  open = false;
  changed = false;
  constructor(private profileService: ProfileService, private elementRef: ElementRef) { }


  ngOnInit() {
    console.log(this.open);
    this.promoCodeForm = new FormGroup({
      promoCode: new FormControl(this.promoCode, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(9),
      ]),
    });
    this.profileService.getPromoCode().subscribe((x) => {
      this.promoCode = x.message;
      this.open = this.promoCode != '' && this.promoCode != null;
    });
  }
  generatePromoCode(): void {
    this.open = true;
    this.profileService
      .generatePromoCode()
      .subscribe((x) => {
        this.promoCode = x.message;
        this.confetti();
      });
  }
  editPromoCode(): void {
    this.changed = true;

    const promoCode = this.promoCodeForm.value.promoCode;
    if (this.promoCodeForm.get(promoCode)?.invalid) {
      this.invalid = true;
    } else {
      this.profileService.editPromoCode(promoCode).subscribe();
    }
    setTimeout(() => {
      this.changed = false;
      this.invalid = false;
    }, 3000);
  }

  confetti(): void {
    party.confetti(document.getElementById('confetti')!);
  }

  copyToClipboard(): void {
    const inputElement = document.getElementById('promoCodeInput') as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');

  }
}