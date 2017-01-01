import { PipeTransform, Pipe } from '@angular/core';
import { Tour } from '../../../models/tour.model';
import { TourPoint } from '../../../models/tour-point.model';

@Pipe({
    name: 'tourFilterByPlace'
})
export class TourFilterByPlacePipe implements PipeTransform {

    transform(value: Tour[], filterBy: string): Tour[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((tour: Tour) => {
            return !!tour.tourPoints.find(tourPoint => tourPoint.city === filterBy);
        }) : value;

        //     for (var tourPoint in tour.tourPoints) {
        //   if (tourPoint.hasOwnProperty(city) && tourPoint[city] ==filterBy) {
        //     return tourPoint;
        //     }}

    }
}