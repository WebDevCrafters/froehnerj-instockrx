import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { Router } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';

@Component({
  selector: 'app-find-my-meds',
  standalone: true,
  imports: [],
  templateUrl: './find-my-meds.component.html',
  styleUrl: './find-my-meds.component.scss'
})
export class FindMyMedsComponent {

  constructor(private router: Router) { }
  
  signup() {
    this.router.navigate([APP_ROUTES.signup])
  }
}
