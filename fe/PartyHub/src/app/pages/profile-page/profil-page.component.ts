import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/types/profile.type';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from 'src/app/services/profile.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css'],
})
export class ProfilPageComponent implements OnInit {
  profile!: Observable<Profile>;
  popup = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();
  }

  togglePopup(): void {
    this.popup = !this.popup;
  }

  deleteAccount(): void {
    this.profileService
      .deleteProfile()
      .subscribe(() => this.router.navigate([PATHS.LOGIN]));
    this.authenticationService.logout();
  }

  navigateToEditProfile(): void {
    this.router.navigate([PATHS.EDITPROFILE]);
  }
  navigateToPromoCodeDetails(): void {
    this.router.navigate([PATHS.PROMOCODEDETAILS]);
  }
}
