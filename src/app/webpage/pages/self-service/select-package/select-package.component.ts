import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../../_shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { Package } from '../../../../_shared/dataTypes/Package';
import { defaultPackage, packageOptions } from '../../../../_shared/constants/data';

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
