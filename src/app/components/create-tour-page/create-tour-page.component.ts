import { Component, Injectable } from '@angular/core';
import { ToursService } from './../../../services/tours.service';

@Injectable()
@Component({
    template: `
    <button (click)="Post()">Post</button>
    `
})
export class CreateTourPageComponent {
    constructor(private toursService: ToursService) { }

    Post() {
        this.toursService.publicateTour({
            tourPoints: [
                {
                    city: 'Washington',
                    country: 'USA',
                    startDate: new Date('2017-11-28'),
                }
            ],
            creator: 'Пешо',
            title: 'На гости на Пешо!',
            city: 'София',
            country: 'България',
            description: 'Познайте къде ще се ходи! На гости на Пешо, разбира се!',
            price: 50.00,
            maxUser: 20,
            endJoinDate: new Date('2016-12-31'),//'2016-12-31 12:39:53.197Z',
            beginTourDate: '2016-12-31 12:39:53.197Z',
            endTourDate: '2016-12-31 12:39:53.197Z',
            isValid: true,
            isDeleted: false,
            usersInTour: []
        }).subscribe(res => console.log(res));
    }
}
