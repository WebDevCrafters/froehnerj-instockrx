import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  label: string = 'Full Name';
  control = new FormControl();
  id: string = ""

  ngOnInit() {
    this.control.valueChanges.subscribe((res) => {
      console.log(res)
    })
  }

}
