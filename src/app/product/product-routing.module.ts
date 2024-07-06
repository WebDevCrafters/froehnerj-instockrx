import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import APP_ROUTES from '../_shared/constants/routes';
import { SelfServiceComponent } from './self-service/self-service.component';
import { DashboardComponent } from '../webpage/pages/dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { ProductComponent } from './product.component';
import { AuthComponent } from './auth/auth.component';

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
      { path: APP_ROUTES.product.auth, component: AuthComponent },
      { path: APP_ROUTES.product.selfService, component: SelfServiceComponent },
      { path: APP_ROUTES.product.dashboard, component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
