import { Component, OnInit } from '@angular/core';
import { MedicationDetailsComponent } from '../_shared/medication-details/medication-details.component';
import { Router } from '@angular/router';
import APP_ROUTES from '../../../../_shared/constants/routes';
import { SearchService } from '../../../../_core/services/search.service';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import Search from '../../../_shared/interfaces/Search';
import { DataService } from '../../../../_core/services/data.service';
import { EmptyStateComponent } from "../../_shared/components/empty-state/empty-state.component";

@Component({
    selector: 'app-active-searches',
    standalone: true,
    imports: [MedicationDetailsComponent, EmptyStateComponent],
    templateUrl: './active-searches.component.html',
    styleUrl: './active-searches.component.scss',
})
export class ActiveSearchesComponent implements OnInit {
    constructor(
        private router: Router,
        private searchService: SearchService,
        private dataService: DataService
    ) { }
    activeSearches: Search[] = [];

    ngOnInit(): void {
        this.getMyInNotStartedSearch();
        this.getMyInProgressSearch();
    }

    viewDetails(searchId?: string) {
        if (searchId)
            this.router.navigate(
                [
                    APP_ROUTES.product.app,
                    APP_ROUTES.product.dashboard,
                    APP_ROUTES.product.patient,
                    APP_ROUTES.product.activeSearches,
                    APP_ROUTES.product.medicationDetails,
                ],
                { queryParams: { searchId: JSON.stringify(searchId) } }
            );
    }

    getMyInProgressSearch() {
        this.searchService.getMySearches(SearchStatus.InProgress).subscribe({
            next: (result) => {
                this.setInDatService(result);
                this.activeSearches.unshift(...result);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getMyInNotStartedSearch() {
        this.searchService.getMySearches(SearchStatus.NotStarted).subscribe({
            next: (result) => {
                this.activeSearches.push(...result);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    setInDatService(searchArr: Search[]) {
        searchArr.forEach((search) => {
            if (search.searchId)
                this.dataService.setData(search.searchId, search);
        });
    }
}
