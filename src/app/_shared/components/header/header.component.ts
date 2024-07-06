import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../../../_core/services/auth.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  modalVisible: boolean = false;
  userEmail: string = '';
  userType: string = 'patient';

  ngOnInit(): void {
    this.getUserEmail();
  }

  getUserEmail() {
    const user = this.authService.getUserData();
    if (!user) return;
    this.userEmail = user.email;
  }

  toggleSettings() {
    this.modalVisible = !this.modalVisible;
  }

  requestAccountDeletion(){
    
  }
}
