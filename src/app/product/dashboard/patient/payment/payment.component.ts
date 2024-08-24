import { Component, Input, OnInit } from '@angular/core';
import { defaultPackage } from '../../../../_shared/constants/data';
import { Package } from '../../../../_shared/dataTypes/Package';
import { SelectPackageComponent } from './select-package/select-package.component';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../../../_core/services/payment.service';
import Payment from '../../../_shared/interfaces/Payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SelectPackageComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  userSubscription: Subscription | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.getUserSubscription();
  }

  async getUserSubscription() {
    // this.paymentService.getCurrentPayment().subscribe({
    //   next: (data: Payment) => {
    //     console.log(data);
    //   },
    //   error: (error: Error) => {
    //     console.log("This is mee",error.message);
    //   },
    // });
  }
}
