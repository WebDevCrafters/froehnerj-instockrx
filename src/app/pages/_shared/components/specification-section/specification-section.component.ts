import { Component, Input } from '@angular/core';


export type Specifications = {
    imagePath: string;
    caption: string;
}

@Component({
    selector: 'app-specification-section',
    standalone: true,
    imports: [],
    templateUrl: './specification-section.component.html',
    styleUrl: './specification-section.component.scss'
})

export class SpecificationSectionComponent {
    @Input() title: string = "";
    @Input() specificationsArray: Specifications[] = []
}
