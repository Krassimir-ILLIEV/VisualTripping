import { Component } from '@angular/core';

@Component({
  selector: 'tour-page',
  templateUrl: './tour-page.component.html'
})
export class TourPageComponent {
  search_ = {};
  onSearch(s: any) {
    this.search_ = s;
    //alert(s);
  }
}

