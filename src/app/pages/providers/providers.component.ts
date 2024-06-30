import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { HowItWorksComponent, StepsType } from '../_shared/components/how-it-works/how-it-works.component';
import { SpecificationSectionComponent } from '../_shared/components/specification-section/specification-section.component';
import { FAQSectionComponent } from '../_shared/components/faq-section/faq-section.component';

@Component({
    selector: 'app-providers',
    standalone: true,
    imports: [SectionBannerComponent, HowItWorksComponent, FAQSectionComponent, SpecificationSectionComponent],
    templateUrl: './providers.component.html',
    styleUrl: './providers.component.scss'
})
export class ProvidersComponent {
    public faqs = [
        {
            question: 'What is insito medfinder?',
            answer: 'Medfinder is a service that partners with providers to help their patients find their medications.',
            isOpen: false
        },
        {
            question: 'How does it work?',
            answer: 'When a patient is having trouble finding their medications, providers or admin staff sends the patient an invite to insito medfinder, or share a link to allow the patient to sign up themselves. Next, the patient creates their account and enters their credit card information. Once the patient has set up their account, insito works to find a pharmacy near the patient that has their medications in stock. After locating the script, insito sends the pharmacy details to the provider and notifies the patient.',
            isOpen: false
        },
        {
            question: 'Is medfinder HIPAA compliant?',
            answer: 'Insito Medfinder is fully HIPAA compliant and our database is fully encrypted to ensure that we keep your trust.',
            isOpen: false
        },
        {
            question: 'What is the success rate of finding medications?',
            answer: 'Currently, insito medfinder has a 99% success rate of finding and filling scripts for the patients that we serve.',
            isOpen: false
        },
        {
            question: 'How much does medfinder cost?',
            answer: 'Medfinder is paid for directly by the patient and our prices are as low as $30 per search. For more information on pricing please visit the pricing page',
            isOpen: false
        },
        {
            question: 'How do I sign up?',
            answer: 'Follow the create your account to sign up on your own and start referring patients, or schedule a call with us to learn more.',
            isOpen: false
        }
    ];

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
