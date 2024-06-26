import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = ""
  clicked: boolean = false

  onClick() {
    this.clicked = true
    setTimeout(() => {
      this.clicked = false
    }, 100);
  }
}
