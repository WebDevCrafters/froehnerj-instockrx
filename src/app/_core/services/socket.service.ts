import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { API_URL, BASE_URL } from '../../../../env';
import { SocketEvents } from '../../product/_shared/interfaces/SocketEvents';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket | null = null;

    constructor() {}

    init() {
        this.socket = io(BASE_URL);
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
