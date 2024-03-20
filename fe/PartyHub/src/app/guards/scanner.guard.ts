import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const scannerGuard: CanActivateFn = (route, state) => {
  const authentication = inject(AuthenticationService);
  return authentication.isScanner;
};
