import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import APP_ROUTES from '../../constants/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  APP_ROUTES = APP_ROUTES
}
