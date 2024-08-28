import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import UserType from '../../product/_shared/interfaces/UserType';
import APP_ROUTES from '../../_shared/constants/routes';

export const clinicianGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const userService = inject(UserService);
    const userType = userService.getUserData()?.user.userType;
    return (
        userType === UserType.Clinician ||
        router.navigate([
          APP_ROUTES.product.app,
          APP_ROUTES.product.dashboard,
          APP_ROUTES.product.newSearch,
      ])
    );
};
