import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../../../services/tours.service';
import { Tour } from '../../../../models/tour.model';

@Component({
    //moduleId: module.id,
    templateUrl: './tours-list-page.component.html'
})
export class ToursListPageComponent implements OnInit {
    tours: Tour[] = [];
    listFilter: string;

    constructor(private toursData: ToursService) { }

    ngOnInit() {
        this.toursData.getAll()
            .then(tours => {
                this.tours = tours;
            });
    }
}
