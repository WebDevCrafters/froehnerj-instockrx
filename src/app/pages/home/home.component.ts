import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';
import { HowItWorksComponent, StepsType } from '../_shared/components/how-it-works/how-it-works.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ButtonComponent, SectionBannerComponent, HowItWorksComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    public faqs = [
        {
            question: 'What is FindMyMed?',
            answer: 'FindMyMed is a service provided by InStockRx to help you find your medications.',
            isOpen: false
        },
        {
            question: 'How do I use FindMyMed?',
            answer: 'You can use FindMyMed by searching for your medication and checking the availability.',
            isOpen: false
        },
        {
            question: 'Is there a cost to use FindMyMed?',
            answer: 'FindMyMed is free to use for all patients.',
            isOpen: false
        }
    ];

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

    toggleAnswer(index: number) {
        this.faqs[index].isOpen = !this.faqs[index].isOpen;
    }
}
