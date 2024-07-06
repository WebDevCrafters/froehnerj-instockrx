import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import APP_ROUTES from '../_shared/constants/routes';
import { SelfServiceComponent } from './self-service/self-service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product.component';
import { AuthComponent } from './auth/auth.component';
import { authPreventGuard } from '../_core/guards/auth-prevent.guard';
import { authGuard } from '../_core/guards/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: APP_ROUTES.product._,
    component: ProductComponent,
    children: [
      {
        path: APP_ROUTES.product._,
        redirectTo: APP_ROUTES.product.auth,
        pathMatch: 'full',
      },
      { path: APP_ROUTES.product.auth, component: AuthComponent, canActivate: [authPreventGuard] },
      { path: APP_ROUTES.product.selfService, component: SelfServiceComponent, canActivate: [authGuard] },
      { path: APP_ROUTES.product.dashboard, component: DashboardComponent, canActivate: [authGuard] },
      { path: APP_ROUTES.product.resetPassword, component: ResetPasswordComponent, canActivate: [authGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
