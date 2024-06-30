import { Component } from '@angular/core';

@Component({
  selector: 'app-infinite-slider',
  standalone: true,
  imports: [],
  templateUrl: './infinite-slider.component.html',
  styleUrl: './infinite-slider.component.scss'
})
export class InfiniteSliderComponent {
  infiniteSlideArray = [1, 2, 3, 5, 6, 4, 8];

}
