import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PATHS } from 'src/app/constants/paths';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbarExtend = false;
  isLoggedIn = false;
  isUser = false;
  isAdmin = false;

  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {
    this.authentication.isLoggedIn.subscribe(
      (value) => (this.isLoggedIn = value)
    );
    this.authentication.isUser.subscribe((value) => (this.isUser = value));
    this.authentication.isAdmin.subscribe((value) => (this.isAdmin = value));
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.navbar') && this.navbarExtend) {
      this.closeNavbar();
    }
  }

  logout(): void {
    this.authentication.logout();
    this.navigateToLogin();
  }

  navigateToLogin(): void {
    this.router.navigate([PATHS.LOGIN]);
    this.closeNavbar();
  }

  navigateToRegister(): void {
    this.router.navigate([PATHS.REGISTER]);
    this.closeNavbar();
  }

  navigateToPartyCode(): void {
    this.router.navigate([PATHS.PROMOCODE]);
    this.closeNavbar();
  }

  navigateToProfile(): void {
    this.router.navigate([PATHS.PROFILE]);
    this.closeNavbar();
  }

  navigateToAddEvent(): void {
    this.router.navigate([PATHS.ADDEVENT]);
    this.closeNavbar();
  }

  navigateToEventsData(): void {
    this.router.navigate([PATHS.EVENTLIST]);
    this.closeNavbar();
  }

  navigateToEvents(): void {
    this.router.navigate([PATHS.EVENTS]);
    this.closeNavbar();
  }

  navigateToAdminPage(): void {
    this.router.navigate([PATHS.ADMIN]);
    this.closeNavbar();
  }

  toggleNavbar(): void {
    this.navbarExtend = !this.navbarExtend;
  }

  navigateToTicketsPage(): void {
    this.router.navigate([PATHS.TICKETSPAGE]);
    this.closeNavbar();
  }

  navigateToTermsAndConds(): void {
    this.router.navigate([PATHS.TERMS]);
    this.closeNavbar();
  }

  navigateToPrivacyPolicy(): void {
    this.router.navigate([PATHS.POLICY]);
    this.closeNavbar();
  }

  closeNavbar(): void {
    this.navbarExtend = false;
  }
}
