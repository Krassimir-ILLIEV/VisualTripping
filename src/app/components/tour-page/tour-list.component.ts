import { Component, Input, OnInit } from '@angular/core';
import { ToursService } from '../../../services/tours.service';
import { Tour } from '../../../models/tour.model';

@Component({
  selector: 'tour-list-container',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-2 form-group">
          <label for="sort">Sort by:</label>
          </div>
          <div class="col-xs-3 form-group">
          <select class="form-control" name="sort"
          [(ngModel)]="fieldToSort">
          <option *ngFor="let f of fieldsToSort" [value]="f.val">{{f.display}}</option>
          </select>
      </div>
      <div class="col-xs-2 form-group">
          <label for="order">Set order:</label>
          </div>
          <div class="col-xs-2 form-group">
          <select class="form-control" name="order"
          [(ngModel)]="orderToSort">
          <option *ngFor="let f of ordersToSort" [value]="f">{{f}}</option>
          </select>
      </div>
      
      <div class="col-xs-offset-2 col-xs-1">
        <div class="pull-right">
          <span class="glyphicon glyphicon-plus-sign" [routerLink]="['/tours', '0']"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="col-xs-12 table table-striped table-bordered">
        <thead>
          <tr>
            <th class="hidden-xs">Description</th>
            <th>Creator</th>
            <th>Places...</th>
            <th class="hidden-xs">Start Date</th>
            <th class="hidden-xs">Duration in Days</th>
            <th class="hidden-xs">Total Price</th>
            <th class="hidden-xs">Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let tour of tours | tourFilterByPlace:listFilter.place 
          | tourFilterByDescription:listFilter.description
          | tourFilterByAfterDate:listFilter.after
          | tourFilterByBeforeDate:listFilter.before
          | tourSort:fieldToSort:orderToSort">
            <td class="hidden-xs">{{tour.description}}...</td>
            <td>{{tour.creator}}</td>
            <td>
              {{tour.tourPoints[0].city}}
              <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"
                [routerLink]="['/tours', tour._id]">
              </span>
            </td>
            <td class="hidden-xs">{{tour.tourPoints[0].startDate | date}}</td>
            <td class="hidden-xs">{{getDuration(tour)}}</td>
            <td class="hidden-xs">{{tour.price}}</td>
            <td class="hidden-xs">
              {{tour.rating}}
              <span class="pull-right glyphicon glyphicon-pencil"
                [routerLink]="['/tours', tour._id]">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class TourListComponent implements OnInit {
  fieldToSort = '';
  orderToSort = '';
  fieldsToSort = [{ val: 'creator', display: 'Creator' },
  { val: 'startDate', display: 'Start Date' },
  { val: 'price', display: 'Price' },
  { val: 'rating', display: 'Rating' }];
  ordersToSort = ['Asc', 'Desc'];
  tours: Tour[] = [];
  @Input() listFilter: any = {};

  constructor(private toursData: ToursService) { }

  ngOnInit() {
    this.toursData.getAll()
      .subscribe(data => {
        this.tours = data.tours;
      });
  }

  private getDuration(tour: Tour) {
    let lastIndex = tour.tourPoints.length - 1;
    let lastDate = new Date(tour.tourPoints[lastIndex].startDate);
    let firstDate = new Date(tour.tourPoints[0].startDate);
    let millisecondsInADay = 86400000;
    return (lastDate.valueOf() - firstDate.valueOf()) / millisecondsInADay + 1;
  }
}

