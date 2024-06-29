import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';

@Component({
    selector: 'app-providers',
    standalone: true,
    imports: [SectionBannerComponent],
    templateUrl: './providers.component.html',
    styleUrl: './providers.component.scss'
})
export class ProvidersComponent {

}
