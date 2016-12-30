import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../../../services/tours.service';
import { Tour } from '../../../../models/tour.model';

@Component({
    //moduleId: module.id,
    //templateUrl: './tours-list-page.component.html'
    template: `
        <div *ngFor="let tour of tours">
            <a [routerLink]="['/tours', tour._id]">{{tour.title}}</a>
            <p>{{tour.creator}}</p>
            <p>{{tour.city}}</p>
            <p>{{tour.description}}</p>
            <p>{{tour.endTourDate}}</p> 
        </div>
    `
})
export class ToursListPageComponent implements OnInit {
    tours: {
        _id: any,
        title: any,
        creator: any,
        description: any,
        city: any,
        country: any,
        endTourDate: any
    }[];
    listFilter: string;

    constructor(private toursData: ToursService) {
        this.tours = [];
    }

    ngOnInit() {
        this.toursData.getAll()
            .subscribe(data => {
                this.tours = data.tours;
            });
    }
}
