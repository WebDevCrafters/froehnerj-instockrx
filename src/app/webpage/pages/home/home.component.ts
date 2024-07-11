import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { HowItWorksComponent, StepsType } from '../_shared/components/how-it-works/how-it-works.component';
import { Specifications, SpecificationSectionComponent } from '../_shared/components/specification-section/specification-section.component';
import { CommonModule } from '@angular/common';
import { FAQSectionComponent } from '../_shared/components/faq-section/faq-section.component';
import { InfiniteSliderComponent } from '../_shared/components/infinite-slider/infinite-slider.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ButtonComponent, SectionBannerComponent, InfiniteSliderComponent, HowItWorksComponent, SpecificationSectionComponent, FAQSectionComponent, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    public faqs = [
        {
            question: 'How does FindMyMeds work?',
            answer: 'FindMyMeds, powered by InStockRx, aggregates and centralizes pharmacy inventories from to help you locate your hard-to-find medications quickly and efficiently.',
            isOpen: false
        },
        {
            question: 'What search radius does FindMyMeds use for medication?',
            answer: 'We start by searching within 30 mile radius from your zip code and then expand as needed. If the pharmacy is too far away, we will request delivery at no cost.',
            isOpen: false
        },
        {
            question: 'What happens if FindMyMeds finds my medication, but it\'s out of stock before I can pick it up?',
            answer: 'If the medication is out of stock when you attempt to pick it up, we will restart your search at no additional charge, provided you attempted to pick up the medication within a reasonable time frame. If the pharmacy informs you that the meds are out of stock after we locate them, we will also restart the search.',
            isOpen: false
        },
        {
            question: 'Is FindMyMeds a subscription service?',
            answer: 'No, FindMyMeds offers one-time, upfront packages. You can purchase a single search or buy multiple searches at a discount.',
            isOpen: false
        },
        {
            question: 'Do unused medication searches from FindMyMeds expire?',
            answer: 'No, unused searches never expire. If you find your meds on your own, you can save your unused search for the next time you need us.',
            isOpen: false
        },
        {
            question: 'What happens if FindMyMeds can\'t find my medication?',
            answer: 'If we can\'t locate your medication, you can choose to receive a refund or save your search for future use.',
            isOpen: false
        },
        {
            question: 'How much does FindMyMeds cost?',
            answer: 'Medication searches start as low as $20 per search. Please visit our pricing page for more information.',
            isOpen: false
        },
        {
            question: 'How do I contact FindMyMeds?',
            answer: 'You can contact us by texting or calling (901) 609-8315.',
            isOpen: false
        }
    ];

    public stepsArray: StepsType[] = [
        {
            highlightedText: 'Sign Up Online:',
            normalText: 'Create an account and enter your hard-to-find medication.',
        },
        {
            normalText: 'We Find Your Med: We locate it at the closest pharmacy.',
        },
        {
            normalText: 'Pick Up Your Med: Receive a text when it\'s found, share the info with your doctor, and pick it up or arrange for delivery',
        }
    ]

    public specificationsArray: Specifications[] = [
        {
            imagePath: "assets/images/svg/phone-disabled-icon.svg",
            caption: "No more calling around to find in stock pharmacies"
        },
        {
            imagePath: "assets/images/svg/check-icon.svg",
            caption: "We'll find your meds or refund your search"
        },
    ]
}
