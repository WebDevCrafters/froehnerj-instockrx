import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { UserService } from '../services/user.service';
import UserType from '../../product/_shared/interfaces/UserType';

export const patientGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const userService = inject(UserService);
    const userType = userService.getUserData()?.user.userType;
    return userType === UserType.Patient ||router.navigate([APP_ROUTES.product.nearBySearches])
    
};
