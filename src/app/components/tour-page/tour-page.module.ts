import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TourPageComponent } from './tour-page.component';
import { SearchTourComponent } from './search-tour.component';
import { TourListComponent } from './tour-list.component';
import { TourFormComponent } from './tour-form.component';
import { TourFilterByKeyWordPipe } from './tours-list-page-filter.pipe';
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
    TourFilterByKeyWordPipe
  ],
  providers: [
    ToursService
  ]
})
export class TourPageModule { }
