import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { TourPoint } from '../../../models/tour-point.model';
import { ToursService } from '../../../services/tours.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'tour-form-container',
  templateUrl: './tour-form.component.html'
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
        if (params['id'] === '0') {
          this.tour = {  //new tour?
            tourPoints: [],
            comments: [],
            pictures: [],
            rating: 0,
            creator: '',
            title: '',
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
      });
  }

  getPlaces(): void {
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
    tour.tourPoints = tour.tourPoints.filter(tourPoint => tourPoint.city !== '');
    alert(JSON.stringify(this.tour)); //TODO
    if (tour.tourPoints.length <= 0) {
      this.notificationsService.error(
        'This tour must have at least one valid tour point.',
        ''
      );
    }
    let testingTour = {
      tourPoints: [
        {
          city: 'Washington',
          country: 'USA',
          startDate: new Date('2017-11-28'),
        }
      ],
      creator: 'Пешо',
      title: 'На гости на Пешо!',
      city: 'София',
      country: 'България',
      description: 'Познайте къде ще се ходи! На гости на Пешо, разбира се!',
      price: 50.00,
      maxUser: 20,
      endJoinDate: new Date('2016-12-31'),//'2016-12-31 12:39:53.197Z',
      beginTourDate: '2016-12-31 12:39:53.197Z',
      endTourDate: '2016-12-31 12:39:53.197Z',
      isValid: true,
      isDeleted: false,
      usersInTour: []
    }
  }
}
