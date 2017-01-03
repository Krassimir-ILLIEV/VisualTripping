import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { TourPoint } from '../../../models/tour-point.model';
import { ToursService } from '../../../services/tours.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'tour-form-container',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourDetailsComponent implements OnInit {
  tour = {};


  constructor(private toursData: ToursService,
    private _route: ActivatedRoute,
    private _router: Router,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this._route.params.subscribe(
      params => {
        let id = params['id'];
        this.getTour(id);
      });
  }

  getTour(id: string): void {
    this.toursData.getTourDetailsById(id)
      .subscribe(data => {
        this.tour = data.tour;
        (this.tour as Tour).tourPoints.map((p: any) => {
          p.cityCountry = p.city + '/' + p.country;
          return p;
        });

      });
  }

  navigateBack(event: any): void {
    this._router.navigate(['/tours']);
  }


}
