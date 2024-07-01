import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';

export type Team = {
    name: string;
    designation: string;
    imagePath: string;
}

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [SectionBannerComponent],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
    public team: Team[] = [
        {
            name: 'Mac Dougherty',
            designation: 'Co-Founder & CEO',
            imagePath: 'assets/images/png/member_1.png',
        },

        {
            name: 'Dr. Alex Toth',
            designation: 'Co-Founder & COO',
            imagePath: 'assets/images/png/member_2.png',
        },
        {
            name: 'JEREMY FROEHNER',
            designation: 'Co-Founder & CTO ',
            imagePath: 'assets/images/png/member_3.png',
        },
        {
            name: 'Laisha Daley',
            designation: 'Chief Marketing Officer',
            imagePath: 'assets/images/png/member_4.png',
        },
        {
            name: 'Lane Wardrop',
            designation: 'VP, SALES ',
            imagePath: 'assets/images/png/member_5.png',
        },
        {
            name: 'Dr. Bret Koertge',
            designation: 'VP, Customer Success  ',
            imagePath: 'assets/images/png/member_6.png',
        },

    ];
}
