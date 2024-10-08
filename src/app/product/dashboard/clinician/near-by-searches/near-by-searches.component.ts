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
import APP_ROUTES from '../../../../_shared/constants/routes';
import { Router } from '@angular/router';
import { DataService } from '../../../../_core/services/data.service';
import { ToastrService } from 'ngx-toastr';

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
        private router: Router,
        private searchService: SearchService,
        private dataService: DataService,
        private availabilityService: AvailabilityService,
        private toastrService: ToastrService
    ) { }
    searches: Search[] = [];

    ngOnInit(): void {
        this.getSearchInRadius();
    }

    getSearchInRadius() {
        this.searchService.getSearchesInRadius().subscribe({
            next: (res) => {
                this.searches = res;
                this.setInDatService(res);
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
                this.toastrService.error(err.error.message);
            },
        });
    }

    setInDatService(searchArr: Search[]) {
        searchArr.forEach((search) => {
            if (search.searchId)
                this.dataService.setSearch(search.searchId, search);
        });
    }


    viewInfo(searchId?: string) {
        if (searchId)
            this.router.navigate([
                APP_ROUTES.product.app,
                APP_ROUTES.product.dashboard,
                APP_ROUTES.product.medicationDetails,
                searchId
            ]);
    }

    markAsAvailable(searchId?: string) {
        if (!searchId) return;
        const availability: Availability = {
            search: searchId,
            markedOn: Date.now()
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
