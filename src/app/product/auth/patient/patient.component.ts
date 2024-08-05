import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-patient',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './patient.component.html',
    styleUrl: './patient.component.scss'
})
export class PatientComponent {

}
