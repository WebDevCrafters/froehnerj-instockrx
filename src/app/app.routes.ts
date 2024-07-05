import { Routes } from '@angular/router';
import APP_ROUTES from './_shared/constants/routes';
import { FindMyMedsComponent } from './pages/find-my-meds/find-my-meds.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SelfServiceComponent } from './pages/self-service/self-service.component';
export const routes: Routes = [
    { path: APP_ROUTES._, loadChildren: () => import("./layout/layout.module").then(m => m.LayoutModule) },
    { path: APP_ROUTES.findMyMeds, component: FindMyMedsComponent },
    { path: APP_ROUTES.selfService, component: SelfServiceComponent },
    { path: APP_ROUTES.dashboard, component: DashboardComponent }
];
