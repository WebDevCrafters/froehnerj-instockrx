import { Component, Input } from '@angular/core';
import { Package } from '../../../../../_shared/dataTypes/Package';
import { defaultPackage } from '../../../../../_shared/constants/data';
import Subscription from '../../../../_shared/interfaces/Subscription';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
    @Input() selectedPackage: Subscription | null = defaultPackage;
}
