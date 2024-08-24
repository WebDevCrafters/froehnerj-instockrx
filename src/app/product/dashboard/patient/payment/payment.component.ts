import { Component, Input } from '@angular/core';
import { defaultPackage } from '../../../../_shared/constants/data';
import { Package } from '../../../../_shared/dataTypes/Package';
import { SelectPackageComponent } from './select-package/select-package.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SelectPackageComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  userSubscription: any | null = {null};

}
