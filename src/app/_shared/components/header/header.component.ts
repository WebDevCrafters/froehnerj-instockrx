import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../../../_core/services/auth.service';
import { ButtonComponent } from '../button/button.component';
import { User } from '../../dataTypes/User';
import { Router } from '@angular/router';
import APP_ROUTES from '../../constants/routes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  modalVisible: boolean = false;
  user: User | null = null;

  ngOnInit(): void {
    this.getUserEmail();
  }

  getUserEmail() {
    const user = this.authService.getUserData();
    if (!user) return;
    this.user = user;
  }

  toggleSettings() {
    this.modalVisible = !this.modalVisible;
  }

  requestAccountDeletion() {}

  signout() {
    this.authService.signOut();
    this.router.navigate(
      [`${APP_ROUTES.product.app}/${APP_ROUTES.product.auth}`],
      { replaceUrl: true }
    );
  }
}
