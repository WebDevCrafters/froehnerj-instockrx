import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../../../_shared/components/button/button.component';
import { HeaderComponent } from '../../../../_shared/components/header/header.component';
import { ModalComponent } from '../../../../_shared/components/modal/modal.component';
import APP_ROUTES from '../../../../_shared/constants/routes';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [HeaderComponent,
        ButtonComponent,
        CommonModule,
        ModalComponent,
        RouterOutlet,
        RouterLink,
        RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @Input() public isSidebarExpanded: boolean = true;
    APP_ROUTES = APP_ROUTES;

}
