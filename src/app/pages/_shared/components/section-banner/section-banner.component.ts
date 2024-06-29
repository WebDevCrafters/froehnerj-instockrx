import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../_shared/components/button/button.component';
import { ButtonType } from '../../../../_shared/dataTypes/ButtonType';

@Component({
    selector: 'app-section-banner',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './section-banner.component.html',
    styleUrl: './section-banner.component.scss'
})
export class SectionBannerComponent {
    @Input() title: string = '';
    @Input() subHeading: string = '';
    @Input() primaryBtnText: string = '';
    @Input() secondaryBtnText: string = '';
    @Input() primaryBtnType: ButtonType = 'default_primary';
    @Input() secondaryBtnType: ButtonType = 'default_secondary';
}
