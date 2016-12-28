import { Component } from '@angular/core';
import { PageComponent } from '../page.component';
import { ToursService } from '../../services/tours.service';
import { Tour } from '../../models/tour.model';

@Component({
    moduleId: module.id,
    templateUrl: './tours-list.page.html'
})
export class ToursListPage implements PageComponent {
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