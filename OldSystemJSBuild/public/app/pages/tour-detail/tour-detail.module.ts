import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TourDetailPage } from '../../pages/tour-detail/tour-detail.page';
import { ToursService } from '../../../app/services/tours.service';

@NgModule({
   imports: [
     BrowserModule,
     FormsModule
  ],
  declarations: [
   TourDetailPage
  ],
  providers: [
    ToursService
  ]
})
export class TourDetailModule {}
