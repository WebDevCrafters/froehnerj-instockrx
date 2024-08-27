import { Injectable } from '@angular/core';
import UserType from '../../product/_shared/interfaces/UserType';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor() {}
    currentUserType: UserType | null = null;

    private dataCache: Map<string, any> = new Map();

    getData(id: string) {
        return this.dataCache.get(id);
    }

    setData(id: string, data: any): void {
        this.dataCache.set(id, data);
    }
}
