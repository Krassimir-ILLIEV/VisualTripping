import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'search-tour-container',
  templateUrl: 'search-tour.component.html'
})
export class SearchTourComponent implements OnInit {
  search = {};
  places = [];
  // listFilterSearch='keyWord';
  // @Input() places: Array<string>;
  // @Input() searchTour: (event: any) => void;
  @Output() onSearch = new EventEmitter<any>();
  searchTour(event: any) {
    // alert(JSON.stringify(this.search));
    this.onSearch.emit(this.search);
  }

  constructor(private toursData: ToursService) { };

  ngOnInit(): void {
    // this.toursDate.getAllPlaces()
    // .then((places:any[]))
  }
}

