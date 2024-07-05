import { Routes } from '@angular/router';
import APP_ROUTES from './_shared/constants/routes';
import { FindMyMedsComponent } from './webpage/pages/find-my-meds/find-my-meds.component';
import { DashboardComponent } from './webpage/pages/dashboard/dashboard.component';
import { SelfServiceComponent } from './webpage/pages/self-service/self-service.component';
import { SigninComponent } from './webpage/pages/signin/signin.component';
export const routes: Routes = [
    { path: APP_ROUTES._, loadChildren: () => import("./webpage/webpage.module").then(m => m.WebpageModule) },

    { path: APP_ROUTES.selfService, component: SelfServiceComponent },
    { path: APP_ROUTES.dashboard, component: DashboardComponent },
    { path: APP_ROUTES.signin, component: SigninComponent }
];
