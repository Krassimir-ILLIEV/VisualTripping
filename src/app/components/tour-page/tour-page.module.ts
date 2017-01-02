import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TourPageComponent } from './tour-page.component';
import { SearchTourComponent } from './search-tour.component';
import { TourListComponent } from './tour-list.component';
import { TourFormComponent } from './tour-form.component';
import {TourSortPipe} from  './tours-list-page-sorting.pipe';
import { TourFilterByDescriptionPipe } from './tours-list-page-description-filter.pipe';
import { TourFilterByPlacePipe } from './tours-list-page-place-filter.pipe';
import{TourFilterByBeforeDatePipe} from './tours-list-page-before-date-filter.pipe';
import{TourFilterByAfterDatePipe} from './tours-list-page-after-date-filter.pipe';
import { ToursService } from '../../../services/tours.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'tours', component: TourPageComponent },
      {
        path: 'tours/:id',
        //canActivate: [ ProductDetailGuard],
        component: TourFormComponent
      }
    ])
  ],
  declarations: [
    TourPageComponent,
    SearchTourComponent,
    TourListComponent,
    TourFormComponent,
    TourSortPipe,
    TourFilterByDescriptionPipe,
    TourFilterByPlacePipe,
    TourFilterByBeforeDatePipe,
    TourFilterByAfterDatePipe
  ],
  providers: [
    ToursService
  ]
})
export class TourPageModule { }
