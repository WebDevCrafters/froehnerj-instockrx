import { Injectable } from '@angular/core';
import UserType from '../../product/_shared/interfaces/UserType';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor() {}
    currentUserType: UserType | null = null;

    private medicationCache: Map<string, any> = new Map();

    getData(id: string) {
        return this.medicationCache.get(id);
    }

    setData(id: string, data: any): void {
        this.medicationCache.set(id, data);
    }
}
