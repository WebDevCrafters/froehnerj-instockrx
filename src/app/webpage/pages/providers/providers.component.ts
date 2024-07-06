import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { HowItWorksComponent, StepsType } from '../_shared/components/how-it-works/how-it-works.component';
import { Specifications, SpecificationSectionComponent } from '../_shared/components/specification-section/specification-section.component';
import { FAQSectionComponent } from '../_shared/components/faq-section/faq-section.component';
import APP_ROUTES from '../../../_shared/constants/routes';

@Component({
    selector: 'app-providers',
    standalone: true,
    imports: [SectionBannerComponent, HowItWorksComponent, FAQSectionComponent, SpecificationSectionComponent],
    templateUrl: './providers.component.html',
    styleUrl: './providers.component.scss'
})
export class ProvidersComponent {

    APP_ROUTES = APP_ROUTES

    public faqs = [
        {
            question: 'What is instockrx findmymeds?',
            answer: 'findmymeds is a service that partners with providers to help their patients find their medications.',
            isOpen: false
        },
        {
            question: 'How does it work?',
            answer: 'When a patient is having trouble finding their medications, providers or admin staff sends the patient an invite to instockrx findmymeds, or share a link to allow the patient to sign up themselves. Next, the patient creates their account and enters their credit card information. Once the patient has set up their account, instockrx works to find a pharmacy near the patient that has their medications in stock. After locating the script, instockrx sends the pharmacy details to the provider and notifies the patient.',
            isOpen: false
        },
        {
            question: 'Is findmymeds HIPAA compliant?',
            answer: 'Instockrx Findmymeds is fully HIPAA compliant and our database is fully encrypted to ensure that we keep your trust.',
            isOpen: false
        },
        {
            question: 'What is the success rate of finding medications?',
            answer: 'Currently, instockrx findmymeds has a 99% success rate of finding and filling scripts for the patients that we serve.',
            isOpen: false
        },
        {
            question: 'How much does findmymeds cost?',
            answer: 'FindMyMeds is paid for directly by the patient and our prices are as low as $30 per search. For more information on pricing please visit the pricing page',
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

    public specificationsArray: Specifications[] = [
        {
            imagePath: "assets/images/svg/phone-disabled-icon.svg",
            caption: "No more calling around to find in stock pharmacies"
        },
        {
            imagePath: "assets/images/svg/money-off-icon.svg",
            caption: "No additional cost for your practice"
        },
    ]
}
