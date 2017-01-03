import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { TourPoint } from '../../../models/tour-point.model';
import { ToursService } from '../../../services/tours.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'tour-form-container',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnInit {
  /*
@Input() specialties: Array<string>;
@Input() doctors: Array<string>;
@Input() patientForm: PatientFormState;
@Input() onSave: (patient: Patient) => void;
@Input() navigateBack: (event: any) => void;
@Input() onChange: (event: any) => void;
*/
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
          p.startDate = p.startDate.split('T')[0];
          return p;
        });
        (this.tour as any).endJoinDate = (this.tour as any).endJoinDate.split('T')[0];
      });
  }

  getPlaces(): void {
    this.toursData.getAllPlaces()
      .subscribe(places => {
        this.places = places;
        this.places.splice(0, 0, { country: 'None', name: '' }); // = data.tour;
        this.places.map(p => {
          p.cityCountry = p.name + '/' + p.country;
          delete p._id;
          return p;
        });
      });
  }

  navigateBack(event: any): void {
    this._router.navigate(['/tours']);
  }

  addNext(): void {
    let point = {
      country: 'None',
      city: '',
      cityCountry: '/None',
      startDate: new Date(),
      duration: 0
    };

    (this.tour as Tour).tourPoints.push(point);
  }


  onSave(event: any): void {
    let tour = this.tour as Tour;
    delete tour._id;
    tour.tourPoints = tour.tourPoints.filter(tourPoint => (tourPoint as any).cityCountry !== '/None');
    tour.tourPoints.map(tourPoint => {
      let a = (tourPoint as any).cityCountry.split('/');
      tourPoint.city = a[0];
      tourPoint.country = a[1];
      delete (tourPoint as any).cityCountry;
      return tourPoint;
    });

    if (tour.tourPoints.length <= 0) {
      this.notificationsService.error(
        'This tour must have at least one valid tour point.',
        ''
      );
    }
    this.toursData.publicateTour(tour)
      .subscribe(res => console.log(res));

    this._router.navigate(['/tours']);
  }
}
