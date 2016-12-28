import { Component } from '@angular/core';
import { PageComponent } from '../page.component';
import { ToursService } from '../../services/tours.service';
import { Tour } from '../../models/tour.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    templateUrl: './tour-detail.page.html'
})
export class TourDetailPage implements PageComponent {
    tour = {};
    errorMessage: string;
    private sub: Subscription;
    //listFilter: string;

    constructor(private toursData: ToursService,
        private _route: ActivatedRoute,
        private _router: Router) { }

    ngOnInit(): void {
        this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getTour(id);
            });
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let id = +params['id'];
        //         this.getTour(id);
        //     });
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }

    onBack(): void {
        this._router.navigate(['/tours']);
    }

    getTour(id: number): void {
        this.toursData.getTourDetailsById(id)
            .then((tour: Tour) => {
                this.tour = tour;
            });
    }
}
