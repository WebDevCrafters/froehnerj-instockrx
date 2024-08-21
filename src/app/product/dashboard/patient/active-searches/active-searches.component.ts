import { Component } from '@angular/core';
import { MedicationDetailsComponent } from '../_shared/medication-details/medication-details.component';
import { Router } from '@angular/router';
import APP_ROUTES from '../../../../_shared/constants/routes';

@Component({
    selector: 'app-active-searches',
    standalone: true,
    imports: [MedicationDetailsComponent],
    templateUrl: './active-searches.component.html',
    styleUrl: './active-searches.component.scss'
})
export class ActiveSearchesComponent {

    constructor(private router: Router) { }

    viewDetails() {
        this.router.navigate(
            [
                APP_ROUTES.product.app,
                APP_ROUTES.product.dashboard,
                APP_ROUTES.product.patient,
                APP_ROUTES.product.activeSearches,
                APP_ROUTES.product.medicationDetails,
            ]
        );
    }
}
