import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() stepNumber = 1;

  onContinuePress() {
    console.log(this.stepNumber)
    this.stepNumber = this.stepNumber + 1;
    console.log(this.stepNumber)
  }
}
