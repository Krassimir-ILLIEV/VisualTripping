import { Component, OnInit } from '@angular/core';
//import { PageComponent } from '../page.component';
import { ToursService } from '../../../../services/tours.service';
import { Tour } from '../../../../models/tour.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
    //moduleId: module.id,
    //templateUrl: './tour-detail-page.component.html'
    template: `
        <div>
            <p>{{tour.title}}<p>        
            <p>{{tour.creator}}</p>
            <p>{{tour.city}}</p>
            <p>{{tour.description}}</p>
            <p>{{tour.endTourDate}}</p> 
        </div>
    `
})
export class TourDetailPageComponent implements OnInit {
    tour: any;
    errorMessage: string;

    constructor(private toursData: ToursService,
        private _route: ActivatedRoute,
        private _router: Router) {
        this.tour = {};
    }

    ngOnInit(): void {
        this._route.params.subscribe(
            params => {
                let id = params['id'];
                this.getTour(id);
            });
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }

    onBack(): void {
        this._router.navigate(['/tours']);
    }

    getTour(id: string): void {
        this.toursData.getTourDetailsById(id)
            .subscribe(data => {
                this.tour = data.tour;
            });
    }
}
