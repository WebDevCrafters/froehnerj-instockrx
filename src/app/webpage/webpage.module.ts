import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import { WebpageComponent } from './webpage.component';
import { FooterComponent } from '../_shared/components/footer/footer.component';
import { NavbarComponent } from '../_shared/components/navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../_shared/components/button/button.component';

@NgModule({
  declarations: [WebpageComponent, NavbarComponent, FooterComponent],
  imports: [
    RouterOutlet,
    CommonModule,
    WebpageRoutingModule,
    RouterLink,
    ButtonComponent
  ]
})
export class WebpageModule { }
