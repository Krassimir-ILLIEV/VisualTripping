import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TourDetailPageComponent } from './tour-detail-page.component';
import { ToursService } from '../../../../services/tours.service';

@NgModule({
   imports: [
     BrowserModule,
     FormsModule
  ],
  declarations: [
   TourDetailPageComponent
  ],
  providers: [
    ToursService
  ]
})
export class TourDetailModule {}
