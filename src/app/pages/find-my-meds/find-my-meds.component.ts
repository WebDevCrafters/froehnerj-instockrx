import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';

@Component({
  selector: 'app-find-my-meds',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './find-my-meds.component.html',
  styleUrl: './find-my-meds.component.scss'
})
export class FindMyMedsComponent {

}
