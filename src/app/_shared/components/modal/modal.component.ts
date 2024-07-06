import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() bg: string = 'rgba(0, 0, 0, 0.5)';
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  closing: boolean = false;

  closeWithAnimation(): void {
    this.closing = true;
    setTimeout(() => {
      this.close();
      this.closing = false;
    }, 200);
  }

  close() {
    this.isVisible = false;
    this.closeModal.emit();
  }

  onContentClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
