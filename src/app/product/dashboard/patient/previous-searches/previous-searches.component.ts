import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../_core/services/search.service';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import Search from '../../../_shared/interfaces/Search';
import APP_ROUTES from '../../../../_shared/constants/routes';
import { Router } from '@angular/router';
import { DataService } from '../../../../_core/services/data.service';

@Component({
    selector: 'app-previous-searches',
    standalone: true,
    imports: [],
    templateUrl: './previous-searches.component.html',
    styleUrl: './previous-searches.component.scss',
})
export class PreviousSearchesComponent implements OnInit {
    previousSearches: Search[] = [];
    constructor(
        private searchService: SearchService,
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.getMyCompletedSearch();
    }

    getMyCompletedSearch() {
        this.searchService.getMySearches(SearchStatus.Completed).subscribe({
            next: (result) => {
                this.setInDatService(result);
                this.previousSearches.push(...result);
            },
            error: (err) => {
                console.log(err);
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
