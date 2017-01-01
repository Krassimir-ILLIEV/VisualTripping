import { PipeTransform, Pipe } from '@angular/core';
import { Tour } from '../../../models/tour.model';

@Pipe({
    name: 'tourSort'
})
export class TourSortPipe implements PipeTransform {

    transform(value: Tour[], sortBy: string, orderBy: string): Tour[] {
        let ordering = 1;
        if (orderBy === 'Desc') {
            ordering = -ordering;
        }

        if (sortBy === 'startDate') {
            value.sort((element1: Tour, element2: Tour) => {
                let a = element1.tourPoints[0].startDate; // works despite not being converted to date
                let b = element2.tourPoints[0].startDate;

                if (a < b) {
                    return -ordering;
                } else if (a > b) {
                    return ordering;
                } else {
                    return 0;
                }
            });
            return value;
        } else if (typeof (sortBy) === 'string') {
            value.sort((element1: Tour, element2: Tour) => {
                let a = element1[sortBy];
                let b = element2[sortBy];

                if (a < b) {
                    return -ordering;
                } else if (a > b) {
                    return ordering;
                } else {
                    return 0;
                }
            });
            return value;
        } else {
            return value;
        }
    }
}
