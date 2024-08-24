import { Component, Input } from '@angular/core';
import { Package } from '../../../../../_shared/dataTypes/Package';
import Payment from '../../../../_shared/interfaces/Payment';

@Component({
    selector: 'app-current-package',
    standalone: true,
    imports: [],
    templateUrl: './current-package.component.html',
    styleUrl: './current-package.component.scss',
})
export class CurrentPackageComponent {
    @Input() payment: Payment | null = null;
}
