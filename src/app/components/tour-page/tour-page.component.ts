import { Component } from '@angular/core';

@Component({
  selector: 'tour-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <search-tour-container class="col-md-4" (onSearch)="onSearch($event)"></search-tour-container>
      
      <tour-list-container class="col-md-8" [listFilter]='search_'></tour-list-container>
    </div>
  </div>
  `
})
export class TourPageComponent {
  search_ = {};
  onSearch(s: any) {
    this.search_ = s;
    //alert(s);
  }
}

