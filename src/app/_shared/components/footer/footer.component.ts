import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import APP_ROUTES from '../../constants/routes';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    APP_ROUTES = APP_ROUTES;

    constructor(private router: Router, private viewportScroller: ViewportScroller) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });
    }
}
