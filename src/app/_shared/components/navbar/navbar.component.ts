import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import APP_ROUTES from '../../constants/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  APP_ROUTES = APP_ROUTES

  constructor(private router: Router) {

  }

  openFindMyMeds() {
    const url = this.router.serializeUrl(this.router.createUrlTree([APP_ROUTES.findMyMeds]));
    window.open(url, '_blank');
  }
}
