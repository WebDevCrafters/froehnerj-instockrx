import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor() {}

    private dataCache: Map<string, any> = new Map();

    getData(id: string) {
        return this.dataCache.get(id);
    }

    setData(id: string, data: any): void {
        this.dataCache.set(id, data);
    }
}
