import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'search-tour-container',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-12">
        <span class="col-xs-1 glyphicon glyphicon-search"></span>
        <p class="col-xs-9">Search tour</p>
        <span class="collapse-toggle pull-right glyphicon glyphicon-collapse-down" data-toggle="collapse"
          data-target="#search-form">
        </span>
      </div>
      <form id="search-form" class="collapse">
        <div class="col-xs-6 form-group">
          <label for="after">Start Date After</label>
          <input type="date" class="form-control" id="after" name="after"
          [(ngModel)]="search.after"/>
        </div>
        <div class="col-xs-6 form-group">
          <label for="before">Start Date Before</label>
          <input type="date" class="form-control" id="before" name="before"
          [(ngModel)]="search.before"/>
        </div>
        <div class="col-xs-12 form-group">
          <label for="place">Place To Visit</label>
          <select class="form-control" name="place"
          [(ngModel)]="search.place">
            <option *ngFor="let p of places" [value]="p.city">{{p.city+"("+p.country+")"}}</option>
          </select>
        </div>
        <div class="col-xs-12 form-group">
          <label for="keyWord">Description Includes:</label>
          <input type="text" class="form-control" id="keyWord" name="keyWord"
          [(ngModel)]="search.description" 
          />
        </div>
        <div class="col-xs-offset-10 col-xs-2 form-group">
          <div class="pull-right">
            <button (click)="searchTour($event)" class="btn btn-primary">Search</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
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

