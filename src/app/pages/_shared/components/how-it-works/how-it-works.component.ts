import { Component, Input } from '@angular/core';

export type StepsType = {
    highlightedText?: string;
    normalText: string;
}

@Component({
    selector: 'app-how-it-works',
    standalone: true,
    imports: [],
    templateUrl: './how-it-works.component.html',
    styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
    @Input() stepsArray: StepsType[] = [];
}
