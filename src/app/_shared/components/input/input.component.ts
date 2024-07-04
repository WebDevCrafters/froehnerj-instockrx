import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputType } from 'zlib';
import { InputShape } from '../../dataTypes/InputSHape';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control = new FormControl();
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() bg: string = '';
  @Input() type: InputType = 'text';
  @Input() shape: InputShape = "rounded";
  isFocused = false;
  errorMessage: string = '';

  ngOnInit() {
    this.control.statusChanges.subscribe(() => {
      this.updateErrorMessage();
    });

    this.updateErrorMessage();
  }

  handleChange(event: Event): void {
    if (this.type === 'checkbox') {
      const input = event.target as HTMLInputElement;
      this.control.setValue(input.checked);
    } else if (this.type === 'phoneNumber') {
      this.formatPhoneNumber();
    } else if (this.type === 'dates') {
      this.formatDate();
    } else if (this.type === 'numbers') {
      this.formatNumber();
    }
  }

  formatPhoneNumber(): void {
    if (this.type === 'phoneNumber') {
      let value = this.control.value.replace(/\D/g, '');
      if (value.length > 3 && value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else if (value.length > 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
          6,
          10
        )}`;
      }
      this.control.setValue(value, { emitEvent: false });
    }
  }

  formatDate(): void {
    let value = this.control.value.replace(/\D/g, '');
    if (value.length > 2 && value.length <= 4) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
    }
    this.control.setValue(value, { emitEvent: false });
  }

  formatNumber() {
    let value = this.control.value.replace(/\D/g, '');
    this.control.setValue(value, { emitEvent: false });
  }

  updateErrorMessage(): void {
    if (this.control.errors) {
      for (const errorName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(errorName)) {
          this.errorMessage = this.control.errors[errorName];
          return;
        }
      }
    }
    this.errorMessage = '';
  }

  focusInput(input: HTMLInputElement): void {
    input.focus();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
