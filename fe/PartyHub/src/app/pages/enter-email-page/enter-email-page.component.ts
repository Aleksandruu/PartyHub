import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-enter-email-page',
  templateUrl: './enter-email-page.component.html',
  styleUrls: ['./enter-email-page.component.css'],
})
export class EnterEmailPageComponent implements OnInit {
  emailForm!: FormGroup;
  sent = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  sendEmail() {
    let email: string = this.emailForm.value.email;
    this.sent = true;
    this.authenticationService.sendResetPasswordEmail(email).subscribe();
  }
}
