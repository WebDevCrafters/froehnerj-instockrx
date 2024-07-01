import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../_shared/components/modal/modal.component';
import { ButtonComponent } from '../../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-package',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './select-package.component.html',
  styleUrl: './select-package.component.scss',
})
export class SelectPackageComponent {
  @Output() onSelectPackageSubmit = new EventEmitter<string>();
  @Input() selectedPackageId = '2';
  packageOptions = [
    {
      id: '1',
      title: 'One Med Search',
      cost: 50,
      description:
        "$50 per successfull search.\nGet a full refund if we don't find your medication!",
    },
    {
      id: '2',
      title: 'Three Med Searches',
      cost: 120,
      description:
        '$40 per successfull search.\nMost popular package. Use remaining searches anytime in the future for any medications.',
    },
    {
      id: '3',
      title: 'Six Med Searches',
      cost: 180,
      description:
        '$30 per successfull search.\nBest value! Use remaining searches any time in the future, for any medication.',
    },
  ];

  selectPackage(selectedPackageId: string) {
    this.selectedPackageId = selectedPackageId;
  }

  onSubmit() {
    this.onSelectPackageSubmit.emit(this.selectedPackageId)
  }
}
