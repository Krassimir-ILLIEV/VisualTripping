import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { ToursListPage } from '../../pages/tours-list/tours-list.page';
import { TourDetailModule } from '../../pages/tour-detail/tour-detail.module';
import { TourDetailPage } from '../../pages/tour-detail/tour-detail.page';

import { TourFilterByKeyWordPipe } from '../../pages/tours-list/tour-filter.pipe';
import { ToursService } from '../../../app/services/tours.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TourDetailModule,
    RouterModule.forChild([
      { path: 'tours', component: ToursListPage },
      { path: 'tour/:id',
        //canActivate: [ ProductDetailGuard],
        component: TourDetailPage
      }
    ])
  ],
  declarations: [
    ToursListPage,
    TourFilterByKeyWordPipe
  ],
  providers: [
    ToursService
  ]
})
export class TourModule { }
