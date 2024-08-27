import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../_core/services/data.service';
import Search from '../../../../_shared/interfaces/Search';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../../../_core/services/search.service';
import { AvailabilityService } from '../../../../../_core/services/availability.service';
import Availability from '../../../../_shared/interfaces/Availability';

@Component({
    selector: 'app-medication-details',
    standalone: true,
    imports: [],
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

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private availabilityService: AvailabilityService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.searchId = params.get("searchId")

            console.log(this.searchId);
            this.getSearchDetails();
        });
        this.getAvailability();
    }

    getSearchDetails() {
        if (this.searchId)
            this.search = this.dataService.getData(this.searchId);
        console.log(this.search);
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
