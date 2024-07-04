import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import APP_ROUTES from '../../constants/routes';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    APP_ROUTES = APP_ROUTES;
    menuOpen = false;

    constructor(private router: Router) { }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.checkScreenWidth();
    }

    private checkScreenWidth() {
        if (window.innerWidth > 800) {
            this.menuOpen = false;
        }
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
        this.menuOpen = false;
    }

    openFindMyMeds(event: MouseEvent) {
        const url = this.router.serializeUrl(this.router.createUrlTree([APP_ROUTES.signin]));
        window.open(url, '_blank');
    }
}
