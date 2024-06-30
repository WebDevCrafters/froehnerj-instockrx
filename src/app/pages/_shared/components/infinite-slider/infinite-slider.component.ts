import { Component } from '@angular/core';

@Component({
  selector: 'app-infinite-slider',
  standalone: true,
  imports: [],
  templateUrl: './infinite-slider.component.html',
  styleUrl: './infinite-slider.component.scss',
})
export class InfiniteSliderComponent {
  // infiniteSlideArray = [
  //   {
  //     name: 'Joey. R',
  //     title: "I can't thank this guys enough",
  //     description:
  //       'I  was out of my medication for two months and this company getting my vyvanse for me within 24hrs was phenomenal. Their response time and understanding of my situation was top notch. I found them through tiktok and will definitely be using in the future.',
  //   },
  // ];
  infiniteSlideArray = [1, 2, 3, 5, 6, 4, 8];
}
