import { PipeTransform, Pipe } from '@angular/core';
import { Tour } from '../../models/tour.model';

@Pipe({
    name: 'tourFilterByKeyWord'
})
export class TourFilterByKeyWordPipe implements PipeTransform {

    transform(value: Tour[], filterBy: string): Tour[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((tour: Tour) =>
            tour.keywords.indexOf(filterBy) > -1) : value;

    }
}