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
import { FindMyMedsComponent } from './pages/find-my-meds/find-my-meds.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';

const routes: Routes = [
  {
    path: APP_ROUTES._._,
    component: WebpageComponent,
    children: [
      { path: APP_ROUTES._._, component: HomeComponent },
      { path: APP_ROUTES._.about, component: AboutUsComponent },
      { path: APP_ROUTES._.patients, component: PatientsComponent },
      { path: APP_ROUTES._.pricing, component: PricingComponent },
      { path: APP_ROUTES._.providers, component: ProvidersComponent },
      { path: APP_ROUTES._.privacy, component: PrivacyComponent },
      { path: APP_ROUTES._.termsOfService, component: TermsOfServiceComponent },
      { path: APP_ROUTES._.findMyMeds, component: FindMyMedsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebpageRoutingModule {}
