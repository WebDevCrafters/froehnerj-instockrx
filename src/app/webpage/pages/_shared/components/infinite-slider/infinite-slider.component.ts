import { Component } from '@angular/core';

@Component({
  selector: 'app-infinite-slider',
  standalone: true,
  imports: [],
  templateUrl: './infinite-slider.component.html',
  styleUrl: './infinite-slider.component.scss',
})
export class InfiniteSliderComponent {
  infiniteSlideArray = [
    {
      name: 'Joey R.',
      title: "I can't thank these guys enough",
      imageSrc: 'assets/images/png/reviwer1.png',
      description:
        'I was out of my medication for two months and this company getting my Vyvanse for me within 24 hours was phenomenal. Their response time and understanding of my situation was top-notch. I found them through TikTok and will definitely be using them in the future.',
    },
    {
      name: 'Alice B.',
      imageSrc: 'assets/images/png/reviwer2.png',
      title: 'A life-saver!',
      description:
        'This service saved my life. I had no idea how I was going to get my medication, and they delivered it to me so quickly. I am forever grateful and will recommend them to everyone.',
    },
    {
      name: 'Michael T.',
      imageSrc: 'assets/images/png/reviwer3.png',
      title: 'Incredible service',
      description:
        'I am amazed by how fast and efficient this company is. They understood my urgent need and delivered my medication within a day. Excellent customer service!',
    },
    {
      name: 'Emily H.',
      imageSrc: 'assets/images/png/reviwer4.png',
      title: 'Highly recommend',
      description:
        'I found this company on social media, and I am so glad I did. They were professional, quick, and really cared about my situation. I will definitely use their service again.',
    },
    {
      name: 'David K.',
      imageSrc: 'assets/images/png/reviwer5.png',
      title: 'Outstanding support',
      description:
        'Their support team is amazing. They helped me get my medication when I was in a bind, and their prompt service made all the difference. A fantastic company!',
    },
  ];
}
