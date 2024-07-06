import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import APP_ROUTES from '../../_shared/constants/routes';

export const authPreventGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isAuthPrevented = !inject(AuthService).checkIfSignedIn();
  return isAuthPrevented || router.navigate([`${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`]);
};
