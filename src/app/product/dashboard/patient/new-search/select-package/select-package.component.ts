import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../_shared/components/button/button.component';
import { defaultPackage, packageOptions } from '../../../../../_shared/constants/data';
import { Package } from '../../../../../_shared/dataTypes/Package';

@Component({
    selector: 'app-select-package',
    standalone: true,
    imports: [ButtonComponent, CommonModule],
    templateUrl: './select-package.component.html',
    styleUrl: './select-package.component.scss',
})
export class SelectPackageComponent {
    @Output() onSelectPackageSubmit = new EventEmitter<Package>();
    @Input() selectedPackage = defaultPackage;
    packageOptions = packageOptions;

    selectPackage(selectedPackage: Package) {
        this.selectedPackage = selectedPackage;
    }

    onSubmit() {
        this.onSelectPackageSubmit.emit(this.selectedPackage)
    }
}
