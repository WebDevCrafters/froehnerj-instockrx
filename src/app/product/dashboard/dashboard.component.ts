import { Component } from '@angular/core';
import { HeaderComponent } from '../../_shared/components/header/header.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  paymentCompleted: boolean = false;

}
