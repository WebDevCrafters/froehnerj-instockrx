import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { FAQSectionComponent } from '../_shared/components/faq-section/faq-section.component';
import APP_ROUTES from '../../../_shared/constants/routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pricing',
    standalone: true,
    imports: [ButtonComponent, SectionBannerComponent, FAQSectionComponent],
    templateUrl: './pricing.component.html',
    styleUrl: './pricing.component.scss'
})
export class PricingComponent {
    APP_ROUTES = APP_ROUTES;

    constructor(private router: Router) { }

    public faqs = [
        {
            question: 'How does it work?',
            answer: 'FindMyMeds is a service provided by InStockRx to help you find your medications.',
            isOpen: false
        },
        {
            question: 'What radius do you search for medication?',
            answer: 'We start in your immediate zip code, and move out to further zip codes until we locate a medication that works for you. If the pharmacy we find is too far away, we are happy to restart a search for you.',
            isOpen: false
        },
        {
            question: 'What happens if you find my meds, but they are out of stock before I can pick them up?',
            answer: 'In this case, we are happy to restart your search at no additional charge, providing that you attempted to pick up the medications within a reasonable time frame. If you call the pharmacy and they tell you the meds are out of stock after we locate them, we are happy to restart a search as well.',
            isOpen: false
        },
        {
            question: 'Is this a subscription?',
            answer: 'No! We only charge one-time, up front packages.You can purchase just one search, or buy multiple and save.',
            isOpen: false
        },
        {
            question: 'Do unused med searches expire?',
            answer: 'Nope! Unused searches never expire. That way, if you are able to find your meds on your own one month, you can save your unused search for the next time you need us!',
            isOpen: false
        },
        {
            question: 'What happens if you can\'t find my medication?',
            answer: 'We can either refund your search or you can save your search for another time later down the line.',
            isOpen: false
        },
        {
            question: 'How much does findMyMed cost?',
            answer: 'Med searches are as low as $30 per search. Please visit our pricing page for more information.',
            isOpen: false
        },
        {
            question: 'How do I contact findMyMed?',
            answer: 'You can contact us by texting or calling us at (617) 631-8894.',
            isOpen: false
        }
    ];


    openFindMyMeds(event: MouseEvent) {
        const url = this.router.serializeUrl(this.router.createUrlTree([APP_ROUTES.findMyMeds]));
        window.open(url, '_blank');
    }

}
