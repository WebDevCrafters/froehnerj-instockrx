import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import { defaultPackage } from '../../../../../_shared/constants/data';
import Subscription from '../../../../_shared/interfaces/Subscription';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { PaymentService } from '../../../../../_core/services/payment.service';
import { AddPaymentRequest } from '../../../../_shared/interfaces/AddPaymentRequest';
import PaymentStatus from '../../../../_shared/interfaces/PaymentStatus';
import { Subscription as ObservableSubscription } from 'rxjs';
import Payment from '../../../../_shared/interfaces/Payment';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [ButtonComponent, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnDestroy {
    @Input() selectedPackage: Subscription | null = defaultPackage;
    @Output() onPaymentComplete = new EventEmitter<Payment>();
    allSubscriptions$: ObservableSubscription[] = [];

    public isLoading: boolean = false;

    constructor(private paymentService: PaymentService) {}

    ngOnDestroy(): void {
        this.allSubscriptions$.forEach((sub) => sub.unsubscribe());
    }

    pay() {
        this.isLoading = true;
        if (!this.selectedPackage?.subscriptionId) {
            this.isLoading = false;
            return;
        }

        const addPaymentRequest: AddPaymentRequest = {
            subscription: this.selectedPackage.subscriptionId,
            status: PaymentStatus.PAID,
            paidOn: Date.now(),
        };
        const subscription$ = this.paymentService
            .addPayment(addPaymentRequest)
            .subscribe({
                next: (res) => {
                    this.onPaymentComplete.emit(res);
                    console.log(res);
                    this.isLoading = false;
                },
                error: (err) => {
                    console.log(err);
                    this.isLoading = false;
                },
            });
        this.allSubscriptions$.push(subscription$);
    }

    checkout() {
        if (!this.selectedPackage) return; 
        // this.paymentService.stripeSession(this.selectedPackage);
    }
}
