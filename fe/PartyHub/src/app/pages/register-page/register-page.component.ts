import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { Register } from 'src/app/types/register.type';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  passwordMissmatch = false;
  sent = false;

  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      age: new FormControl(0, [
        Validators.required,
        Validators.min(18),
        Validators.max(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    }, { validators: this.confirmPasswordValidator() });
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { 'passwordMismatch': true };
    };
  }

  navigateToLogin(): void {
    this.router.navigate([PATHS.LOGIN]);
  }

  register(): void {
    let password = this.registerForm.value.password;
    let confirmPassword = this.registerForm.value.confirmPassword;
    this.sent = true;
    if (password == confirmPassword) {
      this.passwordMissmatch = false;
      let register: Register = {
        email: this.registerForm.value.email,
        fullName: this.registerForm.value.fullName,
        age: this.registerForm.value.age,
        password: this.registerForm.value.password,
      };
      this.authentication.register(register).subscribe();
      setTimeout(() => this.router.navigate([PATHS.LOGIN]), 3000);
    } else {
      this.passwordMissmatch = true;
    }
  }
}
