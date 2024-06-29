import { Component } from '@angular/core';
import { SectionBannerComponent } from '../_shared/components/section-banner/section-banner.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SectionBannerComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
