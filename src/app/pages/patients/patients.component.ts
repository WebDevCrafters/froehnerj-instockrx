import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [SectionBannerComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss'
})
export class PatientsComponent {

}
