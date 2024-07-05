import { Routes } from '@angular/router';
import APP_ROUTES from './_shared/constants/routes';
import { FindMyMedsComponent } from './webpage/pages/find-my-meds/find-my-meds.component';
import { DashboardComponent } from './webpage/pages/dashboard/dashboard.component';
import { SelfServiceComponent } from './product/self-service/self-service.component';
import { SigninComponent } from './product/signin/signin.component';
export const routes: Routes = [
    { path: APP_ROUTES.webpage._, loadChildren: () => import("./webpage/webpage.module").then(m => m.WebpageModule) },

    { path: APP_ROUTES.webpage.selfService, component: SelfServiceComponent },
    { path: APP_ROUTES.product.dashboard, component: DashboardComponent },
    { path: APP_ROUTES.product.auth, component: SigninComponent }
];
