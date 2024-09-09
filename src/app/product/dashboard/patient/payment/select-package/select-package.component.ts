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

    constructor(private subscriptionService: SubscriptionService) {}

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
        this.onSelectPackageSubmit.emit(this.selectedPackage);
    }
}
