import { Routes } from '@angular/router';
import APP_ROUTES from './_shared/constants/routes';
import { FindMyMedsComponent } from './webpage/pages/find-my-meds/find-my-meds.component';

export const routes: Routes = [
    {
        path: APP_ROUTES.webpage._,
        loadChildren: () =>
            import('./webpage/webpage.module').then((m) => m.WebpageModule),
    },
    {
        path: APP_ROUTES.product.app,
        loadChildren: () =>
            import('./product/product.module').then((m) => m.ProductModule),
    },
    { path: APP_ROUTES.webpage.findMyMeds, component: FindMyMedsComponent },
];
