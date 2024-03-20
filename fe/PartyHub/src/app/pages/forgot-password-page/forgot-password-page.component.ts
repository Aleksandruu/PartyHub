import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css'],
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  wrongPassword = false;
  token!: string;
  sent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
    });
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  saveNewPassword() {
    let password: string = this.forgotPasswordForm.value.password;
    let passwordConfirm: string = this.forgotPasswordForm.value.passwordConfirm;
    this.sent = true;

    if (password == passwordConfirm) {
      this.authenticationService
        .resetPassword(this.token, password)
        .subscribe();
      setTimeout(() => this.router.navigate([PATHS.LOGIN]), 3000);
    } else {
      this.wrongPassword = true;
    }
  }
}
