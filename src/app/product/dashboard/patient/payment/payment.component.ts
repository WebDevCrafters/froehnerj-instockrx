import { Component, Input, OnInit } from '@angular/core';
import { defaultPackage } from '../../../../_shared/constants/data';
import { Package } from '../../../../_shared/dataTypes/Package';
import { SelectPackageComponent } from './select-package/select-package.component';
import { PaymentService } from '../../../../_core/services/payment.service';
import Payment from '../../../_shared/interfaces/Payment';
import { LoaderComponent } from '../../../../_shared/components/loader/loader.component';
import { CurrentPackageComponent } from './current-package/current-package.component';
import Subscription from '../../../_shared/interfaces/Subscription';
import { CheckoutComponent } from './checkout/checkout.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [
        SelectPackageComponent,
        LoaderComponent,
        CurrentPackageComponent,
        CheckoutComponent,
    ],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
    payment: Payment | null = null;
    isLoading: boolean = false;
    selectedPackage: Subscription | null = null;
    step: 1 | 2 = 1;

    constructor(private paymentService: PaymentService,
        private toastrService: ToastrService) { }

    ngOnInit(): void {
        this.getUserSubscription();
    }

    getUserSubscription() {
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

    public selectPackage(event: Subscription | null) {
        this.selectedPackage = event;
        this.step = 2;
    }

    public onPaymentComplete(payment: Payment) {
        this.toastrService.success("Payment successfull");
        this.payment = payment;
    }
}
