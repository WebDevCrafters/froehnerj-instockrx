import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo',
    standalone: true,
    imports: [],
    templateUrl: './demo.component.html',
    styleUrl: './demo.component.scss'
})
export class DemoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
    }
}
