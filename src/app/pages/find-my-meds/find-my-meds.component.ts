import { Component } from '@angular/core';
import { InputComponent } from '../../_shared/components/input/input.component';
import { Router, RouterLink } from '@angular/router';
import APP_ROUTES from '../../_shared/constants/routes';
import { InfiniteSliderComponent } from '../_shared/components/infinite-slider/infinite-slider.component';
import { ButtonComponent } from '../../_shared/components/button/button.component';

@Component({
    selector: 'app-find-my-meds',
    standalone: true,
    imports: [RouterLink, InfiniteSliderComponent, ButtonComponent],
    templateUrl: './find-my-meds.component.html',
    styleUrl: './find-my-meds.component.scss'
})
export class FindMyMedsComponent {
    APP_ROUTES = APP_ROUTES;

    constructor(private router: Router) { }

    openSignup(event: MouseEvent) {
        this.router.navigate([APP_ROUTES.signup])
    }
}
