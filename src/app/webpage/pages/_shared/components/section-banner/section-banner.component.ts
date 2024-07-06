import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { ButtonType } from '../../../../../_shared/dataTypes/ButtonType';
import { Router } from '@angular/router';
import APP_ROUTES from '../../../../../_shared/constants/routes';

@Component({
    selector: 'app-section-banner',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './section-banner.component.html',
    styleUrl: './section-banner.component.scss',
})
export class SectionBannerComponent {
    @Input() title: string = '';
    @Input() subHeading: string = '';
    @Input() primaryBtnText: string = '';
    @Input() secondaryBtnText: string = '';
    @Input() primaryBtnType: ButtonType = 'default_primary';
    @Input() secondaryBtnType: ButtonType = 'default_secondary';
    @Input() routeOnPrimaryBtnClick: string = APP_ROUTES.webpage.findMyMeds;
    @Input() routeOnSecondaryBtnClick: string = `${APP_ROUTES.product.app}/${APP_ROUTES.product.selfService}`;
    @Input() openOnNewPage: boolean = true;

    APP_ROUTES = APP_ROUTES;

    constructor(private router: Router) { }

    openFindMyMeds(event: MouseEvent) {
        if (this.openOnNewPage) {
            const url = this.router.serializeUrl(
                this.router.createUrlTree([this.routeOnPrimaryBtnClick])
            );
            window.open(url, '_blank');
        }
        else {
            this.router.navigate([this.routeOnPrimaryBtnClick]);
        }
    }

    openSignUpPage(event: MouseEvent) {
        if (this.openOnNewPage) {
            const url = this.router.serializeUrl(
                this.router.createUrlTree([this.routeOnSecondaryBtnClick])
            );
            window.open(url, '_blank');
        }

        else {
            this.router.navigate([this.routeOnSecondaryBtnClick]);
        }
    }
}
