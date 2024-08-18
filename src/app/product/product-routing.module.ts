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
import { PatientDashboardComponent } from './dashboard/patient-dashboard/patient-dashboard.component';
import { ClinicianDashboardComponent } from './dashboard/clinician-dashboard/clinician-dashboard.component';
import { EditPatientProfileComponent } from './dashboard/patient-dashboard/edit-patient-profile/edit-patient-profile.component';
import { SelfServiceComponent } from './dashboard/patient-dashboard/self-service/self-service.component';

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
                        path: APP_ROUTES.product.clinician,
                        component: ClinicianComponent,
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
                path: APP_ROUTES.product.selfService,
                component: SelfServiceComponent,
                canActivate: [authGuard],
            },
            {
                path: APP_ROUTES.product.dashboard,
                component: DashboardComponent,
                canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        redirectTo: APP_ROUTES.product.patient,
                        pathMatch: 'full',
                    },
                    {
                        path: APP_ROUTES.product.patient,
                        component: PatientDashboardComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: APP_ROUTES.product.newSearch,
                                pathMatch: 'full',
                            },
                            {
                                path: APP_ROUTES.product.newSearch,
                                component: SelfServiceComponent,
                            },
                            {
                                path: APP_ROUTES.product.activeSearch,
                                component: SelfServiceComponent,
                            },
                            {
                                path: APP_ROUTES.product.editPatientsProfile,
                                component: EditPatientProfileComponent,
                            },
                        ]
                    },
                    {
                        path: APP_ROUTES.product.clinician,
                        component: ClinicianDashboardComponent,
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
