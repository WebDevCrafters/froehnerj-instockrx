import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../_core/services/search.service';
import { SearchStatus } from '../../../_shared/interfaces/SearchStatus';
import Search from '../../../_shared/interfaces/Search';

@Component({
    selector: 'app-previous-searches',
    standalone: true,
    imports: [],
    templateUrl: './previous-searches.component.html',
    styleUrl: './previous-searches.component.scss',
})
export class PreviousSearchesComponent implements OnInit {
    previousSearches: Search[] = [];
    constructor(private searchService: SearchService) {}

    ngOnInit(): void {
        this.getMyCompletedSearch();
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
