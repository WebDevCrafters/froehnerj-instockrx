import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() control = new FormControl();
  @Input() id: string = "";

  toggleCheckbox(): void {
    const newValue = !this.control.value;
    this.control.setValue(newValue);
    console.log(this.control.value)
  }
}
