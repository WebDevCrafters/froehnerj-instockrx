import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import APP_ROUTES from '../_shared/constants/routes';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { WebpageComponent } from './webpage.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { DemoComponent } from './pages/demo/demo.component';

const routes: Routes = [
    {
        path: APP_ROUTES.webpage._,
        component: WebpageComponent,
        children: [
            { path: APP_ROUTES.webpage._, component: HomeComponent },
            { path: APP_ROUTES.webpage.about, component: AboutUsComponent },
            { path: APP_ROUTES.webpage.demo, component: DemoComponent },
            { path: APP_ROUTES.webpage.patients, component: PatientsComponent },
            { path: APP_ROUTES.webpage.pricing, component: PricingComponent },
            { path: APP_ROUTES.webpage.providers, component: ProvidersComponent },
            { path: APP_ROUTES.webpage.privacy, component: PrivacyComponent },
            { path: APP_ROUTES.webpage.termsOfService, component: TermsOfServiceComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WebpageRoutingModule { }
