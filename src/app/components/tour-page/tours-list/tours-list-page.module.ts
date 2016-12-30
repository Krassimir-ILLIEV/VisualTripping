import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToursListPageComponent } from './tours-list-page.component';
import { TourDetailPageComponent } from '../tour-detail/tour-detail-page.component';
import { TourFilterByKeyWordPipe } from './tours-list-page-filter.pipe';
import { ToursService } from '../../../../services/tours.service';
import { TourDetailModule } from '../tour-detail/tour-detail-page.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TourDetailModule,
    RouterModule.forChild([
      { path: 'tours', component: ToursListPageComponent },
      {
        path: 'tours/:id',
        //canActivate: [ ProductDetailGuard],
        component: TourDetailPageComponent
      }
    ])
  ],
  declarations: [
    ToursListPageComponent,
    TourFilterByKeyWordPipe
  ],
  providers: [
    ToursService
  ]
})
export class TourListPageModule { }
