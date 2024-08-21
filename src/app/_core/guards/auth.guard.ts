import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const isAuthenticated = inject(UserService).checkIfSignedIn();
  return isAuthenticated || router.navigate([APP_ROUTES.product.app])
};
