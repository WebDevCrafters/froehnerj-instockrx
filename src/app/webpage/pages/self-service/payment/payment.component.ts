import { Component, Input } from '@angular/core';
import { Package } from '../../../../_shared/dataTypes/Package';
import { defaultPackage } from '../../../../_shared/constants/data';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  @Input() selectedPackage: Package = defaultPackage;
}
