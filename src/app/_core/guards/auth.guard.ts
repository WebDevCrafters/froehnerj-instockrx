import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const isAuthenticated = inject(AuthService).checkIfSignedIn();
  return isAuthenticated || router.navigate([APP_ROUTES.product.app])
};
