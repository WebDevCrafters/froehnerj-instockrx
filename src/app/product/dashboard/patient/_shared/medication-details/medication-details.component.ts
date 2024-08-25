import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../_core/services/data.service';
import Search from '../../../../_shared/interfaces/Search';
import { ActivatedRoute } from '@angular/router';

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

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.searchId = JSON.parse(params['searchId']);

            console.log(this.searchId);
            this.getSearchDetails();
        });
    }

    getSearchDetails() {
        if (this.searchId)
            this.search = this.dataService.getData(this.searchId);
        console.log(this.search);
    }
}
