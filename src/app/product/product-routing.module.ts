import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import APP_ROUTES from '../_shared/constants/routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product.component';
import { AuthComponent } from './auth/auth.component';
import { authPreventGuard } from '../_core/guards/auth-prevent.guard';
import { authGuard } from '../_core/guards/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NewSearchComponent } from './dashboard/patient/new-search/new-search.component';
import { ActiveSearchesComponent } from './dashboard/patient/active-searches/active-searches.component';
import { PreviousSearchesComponent } from './dashboard/patient/previous-searches/previous-searches.component';
import { NearBySearchesComponent } from './dashboard/clinician/near-by-searches/near-by-searches.component';
import { MedicationDetailsComponent } from './dashboard/patient/_shared/medication-details/medication-details.component';
import { SelectPackageComponent } from './dashboard/patient/payment/select-package/select-package.component';
import { PaymentComponent } from './dashboard/patient/payment/payment.component';
import UserType from './_shared/interfaces/UserType';
import { patientGuard } from '../_core/guards/patient.guard';
import { clinicianGuard } from '../_core/guards/clinician.guard';
import { MarkedAsAvailableComponent } from './dashboard/clinician/marked-as-available/marked-as-available.component';
import { ProfileComponent } from './dashboard/_shared/profile/profile.component';

const routes: Routes = [
    {
        path: APP_ROUTES.product._,
        component: ProductComponent,
        children: [
            {
                path: '',
                redirectTo: APP_ROUTES.product.auth,
                pathMatch: 'full',
            },
            {
                path: APP_ROUTES.product.auth,
                component: AuthComponent,
                canActivate: [authPreventGuard],
                children: [
                    {
                        path: '',
                        redirectTo: APP_ROUTES.product.signIn,
                        pathMatch: 'full',
                    },
                    {
                        path: APP_ROUTES.product.signIn,
                        component: SigninComponent,
                    },
                    {
                        path: APP_ROUTES.product.signUp + '/:userType',
                        component: SignupComponent,
                    },
                    {
                        path: APP_ROUTES.product.resetPassword,
                        component: ResetPasswordComponent,
                    },
                ],
            },
            {
                path: APP_ROUTES.product.dashboard,
                component: DashboardComponent,
                canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        redirectTo: APP_ROUTES.product.newSearch,
                        pathMatch: 'full',
                    },
                    {
                        path: APP_ROUTES.product.newSearch,
                        component: NewSearchComponent,
                        canActivate: [patientGuard],
                    },
                    {
                        path: APP_ROUTES.product.activeSearches,
                        component: ActiveSearchesComponent,
                        canActivate: [patientGuard],
                    },
                    {
                        path: APP_ROUTES.product.previousSearches,
                        component: PreviousSearchesComponent,
                        canActivate: [patientGuard],
                    },
                    {
                        path: APP_ROUTES.product.payments,
                        component: PaymentComponent,
                        canActivate: [patientGuard],
                    },
                    {
                        path: APP_ROUTES.product.nearBySearches,
                        component: NearBySearchesComponent,
                        canActivate: [clinicianGuard],
                    },
                    {
                        path: APP_ROUTES.product.markedAsAvailable,
                        component: MarkedAsAvailableComponent,
                        canActivate: [clinicianGuard],
                    },
                    {
                        path:
                            APP_ROUTES.product.medicationDetails + '/:searchId',
                        component: MedicationDetailsComponent,
                    },
                    {
                        path: APP_ROUTES.product.profile,
                        component: ProfileComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
