import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type FAQ = {
    question: string;
    answer: string;
    isOpen: boolean;
}

@Component({
    selector: 'app-faq-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './faq-section.component.html',
    styleUrl: './faq-section.component.scss'
})
export class FAQSectionComponent {
    @Input() faqs: FAQ[] = [];
    @Input() heading: string = '';

    toggleAnswer(index: number) {
        this.faqs[index].isOpen = !this.faqs[index].isOpen;
    }
}
