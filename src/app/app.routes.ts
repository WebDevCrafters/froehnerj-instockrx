import { Routes } from '@angular/router';
import APP_ROUTES from './_shared/constants/routes';
import { FindMyMedsComponent } from './pages/find-my-meds/find-my-meds.component';
export const routes: Routes = [
    { path: APP_ROUTES._, loadChildren: () => import("./layout/layout.module").then(m => m.LayoutModule) },
    { path: APP_ROUTES.findMyMeds, component: FindMyMedsComponent }
];
