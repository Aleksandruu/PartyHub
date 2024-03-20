import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-verify-account-page',
  templateUrl: './verify-account-page.component.html',
  styleUrl: './verify-account-page.component.css',
})
export class VerifyAccountPageComponent implements OnInit {
  token!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  verifyAccount(): void {
    this.authenticationService
      .verifyAccount(this.token)
      .subscribe(() => this.router.navigate([PATHS.LOGIN]));
  }
}
