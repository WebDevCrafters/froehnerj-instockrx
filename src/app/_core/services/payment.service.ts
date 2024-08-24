import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  PAYMENT_URL: string = '/payment';

  constructor(private userService: UserService) {}

  getCurrentPayment(){
    
   
  }
}
