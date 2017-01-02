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
  place = '';
  places = [];

  constructor(private toursData: ToursService,
    private _route: ActivatedRoute,
    private _router: Router,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this._route.params.subscribe(
      params => {
        let id = params['id'];
        if (!id || id === '0') {
          this.tour = {  //new tour?
            tourPoints: [],
            comments: [],
            pictures: [],
            rating: 0,
            creator: '',
            title: 'title',
            description: '',
            price: 0,
            maxUser: 0,
            endJoinDate: new Date(),
            beginTourDate: new Date(),
            endTourDate: new Date(),
            isValid: true,
            isDeleted: false,
            usersInTour: []
          };
        } else {
          this.getTour(id);
        };
        this.getPlaces();
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

  getPlaces(): void {

    this.toursData.getAllPlaces()
      .subscribe(places => {
        this.places = places.map(p => {
          p.cityCountry = p.name + '/' + p.country;
          delete p._id;
          return p;
        });
        this.places.splice(0, 0, { country: 'None', name: '' }); // = data.tour;
        alert(JSON.stringify(this.places)); //TODO
      });

    // this.toursData.getAllPlaces()
    //   .subscribe(data => {
    //     this.places.splice(0, 0, { country: 'None', city: '' }); // = data.tour;
    //   });

  }

  navigateBack(event: any): void {
    this._router.navigate(['/tours']);
  }

  addNext(): void {
    let point = {
      country: '',
      city: '',
      startDate: new Date(),
      duration: 0
    };

    (this.tour as Tour).tourPoints.push(point);
  }


  onSave(event: any): void {
    let tour = this.tour as Tour;
    delete tour._id;
    tour.tourPoints = tour.tourPoints.filter(tourPoint => tourPoint.city !== '');
    tour.tourPoints.map(tourPoint => {
      let a = (tourPoint as any).cityCountry.split('/');
      tourPoint.city = a[0];
      tourPoint.country = a[1];
      delete (tourPoint as any).cityCountry;
      return tourPoint;
    });
    alert(JSON.stringify(tour)); //TODO
    if (tour.tourPoints.length <= 0) {
      this.notificationsService.error(
        'This tour must have at least one valid tour point.',
        ''
      );
    }
    this.toursData.publicateTour(tour)
      .subscribe(res => console.log(res));
  }
}
