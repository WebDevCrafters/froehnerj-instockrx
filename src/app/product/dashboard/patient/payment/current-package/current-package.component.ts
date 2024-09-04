import { Component, Input } from '@angular/core';
import { Package } from '../../../../../_shared/dataTypes/Package';
import Payment from '../../../../_shared/interfaces/Payment';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-current-package',
    standalone: true,
    imports: [LottieComponent, CommonModule],
    templateUrl: './current-package.component.html',
    styleUrl: './current-package.component.scss',
})
export class CurrentPackageComponent {
    @Input() payment: Payment | null = null;
    options: AnimationOptions = {
        path: 'assets/lottie/done.json',
        loop: true,
        autoplay: true,
    };


}
