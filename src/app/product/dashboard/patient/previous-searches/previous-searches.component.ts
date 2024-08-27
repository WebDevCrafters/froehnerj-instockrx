import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../_core/services/search.service';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import Search from '../../../_shared/interfaces/Search';
import { EmptyStateComponent } from "../../_shared/components/empty-state/empty-state.component";
import { LoaderComponent } from "../../../../_shared/components/loader/loader.component";
import { Router } from '@angular/router';
import APP_ROUTES from '../../../../_shared/constants/routes';

@Component({
    selector: 'app-previous-searches',
    standalone: true,
    imports: [EmptyStateComponent, LoaderComponent],
    templateUrl: './previous-searches.component.html',
    styleUrl: './previous-searches.component.scss',
})
export class PreviousSearchesComponent implements OnInit {
    previousSearches: Search[] = [];
    public isLoading: boolean = true;

    constructor(private searchService: SearchService,
        private router: Router) { }

    ngOnInit(): void {
        this.getMyCompletedSearch();
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

    getMyCompletedSearch() {
        this.searchService.getMySearches(SearchStatus.Completed).subscribe({
            next: (result) => {
                this.previousSearches.push(...result);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
