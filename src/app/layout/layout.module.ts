import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from '../_shared/components/footer/footer.component';
import { NavbarComponent } from '../_shared/components/navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../_shared/components/button/button.component';

@NgModule({
  declarations: [LayoutComponent, NavbarComponent, FooterComponent],
  imports: [
    RouterOutlet,
    CommonModule,
    LayoutRoutingModule,
    RouterLink,
    ButtonComponent
  ]
})
export class LayoutModule { }
