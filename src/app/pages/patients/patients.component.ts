import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { HowItWorksComponent, StepsType } from '../_shared/components/how-it-works/how-it-works.component';
import { SpecificationSectionComponent } from '../_shared/components/specification-section/specification-section.component';

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [SectionBannerComponent, HowItWorksComponent, SpecificationSectionComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss'
})
export class PatientsComponent {
    public stepsArray: StepsType[] = [
        {
            highlightedText: 'Sign up online',
            normalText: 'and enter your information.',
        },
        {
            normalText: 'We find your script at a pharmacy in your area.',
        },
        {
            normalText: 'Send your doctor the pharmacy info and pick up your script!',
        }
    ]
}
