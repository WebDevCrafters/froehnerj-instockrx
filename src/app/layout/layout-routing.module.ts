import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import APP_ROUTES from '../_shared/constants/routes';
import { HomeComponent } from '../pages/home/home.component';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { PatientsComponent } from '../pages/patients/patients.component';
import { PricingComponent } from '../pages/pricing/pricing.component';
import { ProvidersComponent } from '../pages/providers/providers.component';
import { LayoutComponent } from './layout.component';
import { PrivacyComponent } from '../pages/privacy/privacy.component';
import { TermsOfServiceComponent } from '../pages/terms-of-service/terms-of-service.component';
import { FindMyMedsComponent } from '../pages/find-my-meds/find-my-meds.component';

const routes: Routes = [
  {
    path: APP_ROUTES._,
    component: LayoutComponent,
    children: [
      { path: APP_ROUTES._, component: HomeComponent },
      { path: APP_ROUTES.about, component: AboutUsComponent },
      { path: APP_ROUTES.patients, component: PatientsComponent },
      { path: APP_ROUTES.pricing, component: PricingComponent },
      { path: APP_ROUTES.providers, component: ProvidersComponent },
      { path: APP_ROUTES.privacy, component: PrivacyComponent },
      { path: APP_ROUTES.termsOfService, component: TermsOfServiceComponent },
      { path: APP_ROUTES.findMyMeds, component: FindMyMedsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
