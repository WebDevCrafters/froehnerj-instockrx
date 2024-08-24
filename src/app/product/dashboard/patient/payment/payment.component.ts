import { Component, Input, OnInit } from '@angular/core';
import { defaultPackage } from '../../../../_shared/constants/data';
import { Package } from '../../../../_shared/dataTypes/Package';
import { SelectPackageComponent } from './select-package/select-package.component';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../../../_core/services/payment.service';
import Payment from '../../../_shared/interfaces/Payment';
import { LoaderComponent } from '../../../../_shared/components/loader/loader.component';
import { CurrentPackageComponent } from './current-package/current-package.component';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [SelectPackageComponent, LoaderComponent, CurrentPackageComponent],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
    payment: Payment | null = null;
    isLoading: boolean = false;

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.getUserSubscription();
    }

    async getUserSubscription() {
        this.isLoading = true;
        this.paymentService.getCurrentPayment().subscribe({
            next: (payment: Payment | null) => {
                this.payment = payment;
                this.isLoading = false;
            },
            error: (error: Error) => {
                console.log('This is mee', error.message);
                this.isLoading = false;
            },
        });
    }
}
