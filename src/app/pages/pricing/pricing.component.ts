import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';

@Component({
    selector: 'app-pricing',
    standalone: true,
    imports: [SectionBannerComponent],
    templateUrl: './pricing.component.html',
    styleUrl: './pricing.component.scss'
})
export class PricingComponent {

}
