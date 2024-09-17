import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { SubscriptionService } from '../../../../../_core/services/subscription.service';
import Subscription from '../../../../_shared/interfaces/Subscription';
import { Subscription as ObservableSubscription } from 'rxjs';
import { AddPaymentRequest } from '../../../../_shared/interfaces/AddPaymentRequest';
import PaymentStatus from '../../../../_shared/interfaces/PaymentStatus';
import { PaymentService } from '../../../../../_core/services/payment.service';

@Component({
    selector: 'app-select-package',
    standalone: true,
    imports: [ButtonComponent, CommonModule],
    templateUrl: './select-package.component.html',
    styleUrl: './select-package.component.scss',
})
export class SelectPackageComponent implements OnInit, OnDestroy {
    @Output() onSelectPackageSubmit = new EventEmitter<Subscription | null>();
    packageOptions: Subscription[] = [];
    @Input() selectedPackage: Subscription | null = null;
    public allSubscriptions$: ObservableSubscription[] = [];
    isLoading = false;

    constructor(
        private subscriptionService: SubscriptionService,
        private paymentService: PaymentService
    ) {}

    ngOnInit(): void {
        this.getSubscriptions();
    }

    ngOnDestroy(): void {
        this.allSubscriptions$.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    getSubscriptions() {
        let subscription$ = this.subscriptionService
            .getAllSubscriptions()
            .subscribe({
                next: (result) => {
                    this.packageOptions = result;
                    this.selectedPackage = result[1];
                    console.log({ result });
                },
                error: (err) => {},
            });
        this.allSubscriptions$.push(subscription$);
    }

    selectPackage(selectedPackage: Subscription) {
        this.selectedPackage = selectedPackage;
    }

    onSubmit() {
        this.checkout();
        // this.onSelectPackageSubmit.emit(this.selectedPackage);
    }

    checkout() {
        if (!this.selectedPackage?.subscriptionId) return;
        this.isLoading = true;
        const addPaymentRequest: AddPaymentRequest = {
            subscription: this.selectedPackage.subscriptionId,
            status: PaymentStatus.PAID,
            paidOn: Date.now(),
        };

        this.paymentService
            .stripeSession(addPaymentRequest)
            .subscribe((result) => {
                if (result.error) {
                    console.log(result.error);
                }
                this.isLoading = false;
            });
    }
}
