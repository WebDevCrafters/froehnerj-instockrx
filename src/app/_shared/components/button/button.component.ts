import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from '../../dataTypes/ButtonType';
import { Shape } from '../../dataTypes/ButtonShape';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    @Input() public title: string = '';
    @Input() public src: string = '';
    @Input() public type: ButtonType = 'default_primary';
    @Input() public formButtonType: 'button' | 'menu' | 'reset' | 'submit' =
        'submit';
    @Input() public shape: Shape = 'square';
    @Input() public iconAlignment: "vertical" | "horizontal" = 'horizontal';
    @Input() public isLoading: boolean = false;
    @Input() public isDisabled: boolean = false;
    @Input({ alias: 'left-image-src' }) public leftImageSrc: string = '';
    @Input({ alias: 'right-image-src' }) public rightImageSrc: string = '';

    @Output() public clickEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    constructor() { }

    public onClick(event: MouseEvent): void {
        this.clickEvent.emit(event);
    }
}
