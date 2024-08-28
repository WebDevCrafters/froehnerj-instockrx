import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../_core/services/data.service';
import Search from '../../../../_shared/interfaces/Search';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../../../_core/services/search.service';
import { AvailabilityService } from '../../../../../_core/services/availability.service';
import Availability from '../../../../_shared/interfaces/Availability';
import { LoaderComponent } from "../../../../../_shared/components/loader/loader.component";
import { EmptyStateComponent } from "../../../../../_shared/components/empty-state/empty-state.component";
import { ButtonComponent } from "../../../../../_shared/components/button/button.component";
import { SearchStatus } from '../../../../_shared/interfaces/SearchStatus';

@Component({
    selector: 'app-medication-details',
    standalone: true,
    imports: [LoaderComponent, EmptyStateComponent, ButtonComponent],
    templateUrl: './medication-details.component.html',
    styleUrl: './medication-details.component.scss',
})
export class MedicationDetailsComponent implements OnInit {
    /**
     @todo Add tooltip, add ellipses, handle mutiple alternative medications
    **/
    search: Search | null = null;
    searchId: string | null = null;
    availability: Availability[] = [];
    searchStatus = SearchStatus;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private availabilityService: AvailabilityService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.searchId = params.get("searchId")
            this.getSearchDetails();
        });
        this.getAvailability();
    }

    getSearchDetails() {
        if (this.searchId) this.search = this.dataService.getData(this.searchId);
    }

    getAvailability() {
        if (!this.searchId) return;
        this.availabilityService.get(this.searchId).subscribe({
            next: (res) => {
                this.availability = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
