import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { TourPoint } from '../../../models/tour-point.model';
import { ToursService } from '../../../services/tours.service';
import { UserService } from './../../../services/user.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'tour-form-container',
  templateUrl: './tour-join.component.html',
})
export class TourJoinComponent implements OnInit {
  tour: Tour;
  usr;
  toJoin = false;


  constructor(private toursData: ToursService,
    private userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    let user = this.userService.isLogged();

    if (!user) {
      this.notificationsService.error(
        'Please log in to publish your comment',
        ''
      );
      this._router.navigate(['/tours']);
    }
    this.usr = (user as String);
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
        this.toJoin = this.tour.usersInTour.indexOf(this.usr) > -1;
      });
  }

  navigateBack(event: any): void {
    this._router.navigate(['/tours']);
  }

  joinTo() {
    let tourId = (this.tour as Tour)._id;
    this.toursData.joinTo(tourId, this.usr, this.toJoin)
     .subscribe(res => {
                    console.log(res);
                    if (res.success) {
                        this.notificationsService.success(
                            res.message,
                            ''
                        );
                    } else {
                        this.notificationsService.error(
                            res.message,
                            ''
                        );
                    }
      //          });
     // .subscribe(res => {
     //   console.log(res);
        this._router.navigate(['/tours']);
      });

  }

}
