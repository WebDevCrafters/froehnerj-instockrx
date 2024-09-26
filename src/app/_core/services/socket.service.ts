import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket | null = null;

    constructor() {}

    init() {
        this.socket = io(environment.BASE_URL);
    }

    emitEvent(event: string, data: any) {
        if (!this.socket) return;
        this.socket.emit(event, data);
    }
    onEvent(event: string, callback: (data: any) => void) {
        if (!this.socket) return;
        this.socket.on(event, callback);
    }
}
