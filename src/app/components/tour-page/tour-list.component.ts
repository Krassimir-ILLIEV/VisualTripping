import { Component, Input, OnInit } from '@angular/core';
import { ToursService } from '../../../services/tours.service';
import { Tour } from '../../../models/tour.model';

@Component({
  selector: 'tour-list-container',
  templateUrl: './tour-list.component.html'
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

