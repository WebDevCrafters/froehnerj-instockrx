import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { HowItWorksComponent, StepsType } from '../_shared/components/how-it-works/how-it-works.component';
import { SpecificationSectionComponent } from '../_shared/components/specification-section/specification-section.component';

@Component({
    selector: 'app-providers',
    standalone: true,
    imports: [SectionBannerComponent, HowItWorksComponent, SpecificationSectionComponent],
    templateUrl: './providers.component.html',
    styleUrl: './providers.component.scss'
})
export class ProvidersComponent {
    public stepsArray: StepsType[] = [
        {
            normalText: 'We partner with your practice and act as an optional medication finding service for patients.',
        },
        {
            normalText: 'When patients sign up, we contact local pharmacies to locate your patient\'s medications.',
        },
        {
            normalText: 'Patients only pay once we\'ve found their medication and have shared the pharmacy info with your practice.',
        }
    ]
}
