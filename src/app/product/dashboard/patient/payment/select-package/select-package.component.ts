import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { SubscriptionService } from '../../../../../_core/services/subscription.service';
import Subscription from '../../../../_shared/interfaces/Subscription';

@Component({
    selector: 'app-select-package',
    standalone: true,
    imports: [ButtonComponent, CommonModule],
    templateUrl: './select-package.component.html',
    styleUrl: './select-package.component.scss',
})
export class SelectPackageComponent implements OnInit {
    @Output() onSelectPackageSubmit = new EventEmitter<Subscription | null>();
    packageOptions: Subscription[] = [];
    @Input() selectedPackage: Subscription | null = null;

    constructor(private subscriptionService: SubscriptionService) {}

    ngOnInit(): void {
        this.getSubscriptions();
    }

    getSubscriptions() {
        this.subscriptionService.getAllSubscriptions().subscribe({
            next: (result) => {
                this.packageOptions = result;
                this.selectedPackage = result[1];
                console.log({result})
            },
            error: (err) => {},
        });
    }

    selectPackage(selectedPackage: Subscription) {
        this.selectedPackage = selectedPackage;
    }

    onSubmit() {
        this.onSelectPackageSubmit.emit(this.selectedPackage);
    }
}
