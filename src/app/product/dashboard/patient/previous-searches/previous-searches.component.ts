import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../_core/services/search.service';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import Search from '../../../_shared/interfaces/Search';
import { Router } from '@angular/router';
import { DataService } from '../../../../_core/services/data.service';
import APP_ROUTES from '../../../../_shared/constants/routes';
import { EmptyStateComponent } from '../../../../_shared/components/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../_shared/components/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-previous-searches',
    standalone: true,
    imports: [EmptyStateComponent, LoaderComponent, CommonModule],
    templateUrl: './previous-searches.component.html',
    styleUrl: './previous-searches.component.scss',
})
export class PreviousSearchesComponent implements OnInit {
    previousSearches: Search[] = [];
    isLoading: boolean = true;
    constructor(
        private searchService: SearchService,
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.getMyCompletedSearch();
    }

    getMyCompletedSearch() {
        this.searchService.getMySearches([SearchStatus.Completed]).subscribe({
            next: (result) => {
                this.setInDatService(result);
                this.previousSearches.push(...result);
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }

    viewDetails(searchId?: string) {
        if (searchId)
            this.router.navigate([
                APP_ROUTES.product.app,
                APP_ROUTES.product.dashboard,
                APP_ROUTES.product.medicationDetails,
                searchId,
            ]);
    }

    setInDatService(searchArr: Search[]) {
        searchArr.forEach((search) => {
            if (search.searchId)
                this.dataService.setData(search.searchId, search);
        });
    }
}
