import { Injectable } from '@angular/core';
import UserType from '../../product/_shared/interfaces/UserType';
import Availability from '../../product/_shared/interfaces/Availability';
import Search from '../../product/_shared/interfaces/Search';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor() { }
    currentUserType: UserType | null = null;

    private searchCache: Map<string, Search> = new Map();
    private availabilityCache: Map<string, Search> = new Map();

    getSearch(id: string) {
        return this.searchCache.get(id) || null;
    }

    setSearch(id: string, data: Search): void {
        this.searchCache.set(id, data);
    }

    getAvailability(id: string) {
        return this.availabilityCache.get(id) || null;
    }

    setAvailability(id: string, data: Search): void {
        this.availabilityCache.set(id, data);
    }
}
