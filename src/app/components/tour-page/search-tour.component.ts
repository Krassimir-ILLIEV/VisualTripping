import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'search-tour-container',
  templateUrl: './search-tour.component.html'
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
    this.getPlaces();
  }

  getPlaces(): void {
    this.toursData.getAllPlaces()
      .subscribe(places => {
        this.places = places;
        this.places.splice(0, 0, { country: 'None', name: '' }); // = data.tour;
        //console.log("places:"+JSON.stringify(this.places));
      });
  }
}

