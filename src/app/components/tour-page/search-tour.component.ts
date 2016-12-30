import { Component, EventEmitter, Input, Output } from '@angular/core';

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
          <label for="date">Start Date</label>
          <input type="date" class="form-control" id="date"/>
        </div>
        <div class="col-xs-6 form-group">
          <label for="time">Time</label>
          <input type="time" class="form-control" id="time"/>
        </div>
        <div class="col-xs-12 form-group">
          <label for="specialty">Places</label>
          <select class="form-control">
            <option *ngFor="let place of places">{{place}}</option>
          </select>
        </div>
        <div class="col-xs-12 form-group">
          <label for="keyWord">Key word</label>
          <input type="text" class="form-control" id="keyWord" name="keyWord"
          [(ngModel)]="listFilterSearch" 
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
export class SearchTourComponent {
  listFilterSearch='keyWord';
  @Input() places: Array<string>;
  //@Input() searchTour: (event: any) => void;
  @Output() onSearch = new EventEmitter<string>();
  @Input() searchTour(event: any) {
    this.onSearch.emit(this.listFilterSearch);
  }
}

