import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const logoutGuard: CanActivateFn = (route, state) => {
  const authentication = inject(AuthenticationService);
  return !authentication.isLoggedIn.getValue();
};
