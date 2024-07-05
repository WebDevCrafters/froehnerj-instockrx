import { Component } from '@angular/core';
import { HeaderComponent } from '../../../_shared/components/header/header.component';
import { ButtonComponent } from '../../../_shared/components/button/button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
