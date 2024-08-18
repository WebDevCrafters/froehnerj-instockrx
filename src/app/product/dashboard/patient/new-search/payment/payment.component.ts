import { Component, Input } from '@angular/core';
import { defaultPackage } from '../../../../../_shared/constants/data';
import { Package } from '../../../../../_shared/dataTypes/Package';

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
