import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';

@Component({
    selector: 'app-pricing',
    standalone: true,
    imports: [ButtonComponent, SectionBannerComponent],
    templateUrl: './pricing.component.html',
    styleUrl: './pricing.component.scss'
})
export class PricingComponent {

}
