import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MedicationDetailsComponent } from '../_shared/medication-details/medication-details.component';
import APP_ROUTES from '../../../../_shared/constants/routes';
import { SearchService } from '../../../../_core/services/search.service';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import Search from '../../../_shared/interfaces/Search';
import { DataService } from '../../../../_core/services/data.service';
import { EmptyStateComponent } from '../../../../_shared/components/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../_shared/components/loader/loader.component';

@Component({
    selector: 'app-active-searches',
    standalone: true,
    imports: [MedicationDetailsComponent, EmptyStateComponent, LoaderComponent],
    templateUrl: './active-searches.component.html',
    styleUrl: './active-searches.component.scss',
})
export class ActiveSearchesComponent implements OnInit {
    constructor(
        private router: Router,
        private searchService: SearchService,
        private dataService: DataService
    ) { }
    public activeSearches: Search[] = [];
    public isLoading: boolean = true;

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
                // this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                // this.isLoading = false;
            },
        });
    }

    getMyInNotStartedSearch() {
        this.searchService.getMySearches(SearchStatus.NotStarted).subscribe({
            next: (result) => {
                this.activeSearches.push(...result);
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
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
