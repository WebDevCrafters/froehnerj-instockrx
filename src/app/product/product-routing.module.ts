import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import APP_ROUTES from '../_shared/constants/routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product.component';
import { AuthComponent } from './auth/auth.component';
import { authPreventGuard } from '../_core/guards/auth-prevent.guard';
import { authGuard } from '../_core/guards/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PatientComponent } from './auth/patient/patient.component';
import { ClinicianComponent } from './auth/clinician/clinician.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { EditPatientProfileComponent } from './dashboard/patient/edit-patient-profile/edit-patient-profile.component';
import { NewSearchComponent } from './dashboard/patient/new-search/new-search.component';
import { ActiveSearchesComponent } from './dashboard/patient/active-searches/active-searches.component';
import { PreviousSearchesComponent } from './dashboard/patient/previous-searches/previous-searches.component';
import { NearBySearchesComponent } from './dashboard/clinician/near-by-searches/near-by-searches.component';
import { MedicationDetailsComponent } from './dashboard/patient/_shared/medication-details/medication-details.component';
import { SelectPackageComponent } from './dashboard/patient/new-search/select-package/select-package.component';

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
                        redirectTo: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.signUp,
                        pathMatch: 'full',
                    },
                    {
                        path: APP_ROUTES.product.patient,
                        component: PatientComponent,
                        children: [
                            {
                                path: APP_ROUTES.product.signUp,
                                component: SignupComponent,
                            },
                            {
                                path: APP_ROUTES.product.signIn,
                                component: SigninComponent,
                            },
                            {
                                path: APP_ROUTES.product.forgotPassword,
                                component: ForgotPasswordComponent,
                            },
                        ]
                    },
                    {
                        path: APP_ROUTES.product.clinician + '/' + APP_ROUTES.product.nearBySearches,
                        component: NearBySearchesComponent,
                        children: [
                            {
                                path: APP_ROUTES.product.signUp,
                                component: SignupComponent,
                            },
                            {
                                path: APP_ROUTES.product.signIn,
                                component: SigninComponent,
                            },
                            {
                                path: APP_ROUTES.product.forgotPassword,
                                component: ForgotPasswordComponent,
                            },
                        ]
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
                        redirectTo: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.newSearch,
                        pathMatch: 'full',
                    },
                    {
                        path: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.newSearch,
                        component: NewSearchComponent,
                    },
                    {
                        path: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.activeSearches,
                        component: ActiveSearchesComponent,
                    },
                    {
                        path: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.activeSearches + '/' + APP_ROUTES.product.medicationDetails,
                        component: MedicationDetailsComponent
                    },
                    {
                        path: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.previousSearches + '/' + APP_ROUTES.product.medicationDetails,
                        component: MedicationDetailsComponent
                    },
                    {
                        path: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.previousSearches,
                        component: PreviousSearchesComponent,
                    },
                    {
                        path: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.editPatientsProfile,
                        component: EditPatientProfileComponent,
                    },
                    {
                        path: APP_ROUTES.product.clinician + '/' + APP_ROUTES.product.nearBySearches,
                        component: NearBySearchesComponent,
                    },
                    {
                        path: APP_ROUTES.product.patient + '/' + APP_ROUTES.product.payments,
                        component: SelectPackageComponent,
                    },
                ],
            },
            {
                path: APP_ROUTES.product.resetPassword,
                component: ResetPasswordComponent,
                canActivate: [authGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule { }
