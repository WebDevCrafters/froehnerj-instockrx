import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../../_core/services/search.service';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import Search from '../../../_shared/interfaces/Search';
import { AvailabilityService } from '../../../../_core/services/availability.service';
import Availability from '../../../_shared/interfaces/Availability';
import { ButtonComponent } from '../../../../_shared/components/button/button.component';
import { LoaderComponent } from "../../../../_shared/components/loader/loader.component";
import { EmptyStateComponent } from "../../../../_shared/components/empty-state/empty-state.component";

@Component({
    selector: 'app-near-by-searches',
    standalone: true,
    imports: [FormsModule, CommonModule, ButtonComponent, LoaderComponent, EmptyStateComponent],
    templateUrl: './near-by-searches.component.html',
    styleUrl: './near-by-searches.component.scss',
})
export class NearBySearchesComponent implements OnInit {

    public isLoading: boolean = true;

    constructor(
        private searchSercice: SearchService,
        private availabilityService: AvailabilityService
    ) { }
    searches: Search[] = [];

    ngOnInit(): void {
        this.getSearchInRadius();
    }

    getSearchInRadius() {
        this.searchSercice.getSearchesInRadius().subscribe({
            next: (res) => {
                this.searches = res;
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }

    markAsAvailable(searchId?: string) {
        if (!searchId) return;
        const availability: Availability = {
            search: searchId,
        };
        this.availabilityService.add(availability).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
