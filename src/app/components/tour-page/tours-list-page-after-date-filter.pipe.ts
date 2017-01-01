import { PipeTransform, Pipe } from '@angular/core';
import { Tour } from '../../../models/tour.model';

@Pipe({
    name: 'tourFilterByAfterDate'
})
export class TourFilterByAfterDatePipe implements PipeTransform {

    transform(value: Tour[], filterBy: string): Tour[] {
        let filterByDate = filterBy ? new Date(filterBy) : null;
        return filterByDate ? value.filter((tour: Tour) => {
            return new Date(tour.tourPoints[0].startDate) >= filterByDate;
        }) : value;
    }
}