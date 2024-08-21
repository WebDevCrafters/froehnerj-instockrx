import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { UserService } from '../services/user.service';

export const authPreventGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthPrevented = !inject(UserService).checkIfSignedIn();
  return (
    isAuthPrevented ||
    router.navigate([
      `${APP_ROUTES.product.app}/${APP_ROUTES.product.dashboard}`,
    ])
  );
};
