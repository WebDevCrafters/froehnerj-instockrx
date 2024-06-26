import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control = new FormControl();
  @Input() id: string = ""
  @Input() placeholder: string = ""
  @Input() type: "text" | "checkbox" | "phoneNumber" = "text"
  isFocused = false;

  ngOnInit() {
    this.control.valueChanges.subscribe((res) => {
      console.log(res)
    })
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
