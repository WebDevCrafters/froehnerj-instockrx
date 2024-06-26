import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = ""
  clicked: boolean = false

  onClickButton(event: MouseEvent) {
    this.clicked = true
    setTimeout(() => {
      this.clicked = false
    }, 500);
  }
}
