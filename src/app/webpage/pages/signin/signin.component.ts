import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../../_shared/components/input/input.component';
import { ButtonComponent } from '../../../_shared/components/button/button.component';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [InputComponent, ButtonComponent],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss'
})
export class SigninComponent {
    public personalInfoForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
    });
}
