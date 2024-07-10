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
            name: 'Joan Koenigsberg',
            title: "FindMyMeds was a lifesaver!",
            imageSrc: 'assets/images/png/reviwer1.png',
            description:
                'They found my medication within hours, and the process was completely stress-free.',
        },
        {
            name: 'Alice B.',
            imageSrc: 'assets/images/png/reviwer2.png',
            title: 'FindMyMeds was a game-changer!',
            description:
                'They found my medication fast, and the process was stress-free.',
        },
        {
            name: 'Michael T.',
            imageSrc: 'assets/images/png/reviwer3.png',
            title: 'FindMyMeds made it so easy to find my medication.',
            description:
                'The process was fast, and I didn\'t have to stress.',
        },
        {
            name: 'Emily H.',
            imageSrc: 'assets/images/png/reviwer4.png',
            title: 'FindMyMeds has been a tremendous resource for our practice.',
            description:
                'It allows us to help patients get their medications quickly and without hassle.',
        }
    ];
}
