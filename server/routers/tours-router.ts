import { Router, Response, Request } from 'express';
import * as someData from './../data';
import { tourController } from './../controllers/tour-controller';

let data;
if (someData) {
    data = {
        getTourById: (id) => {
            return someData.tourModule.getTourById(id);
        },
        getUserByUsername: (username) => {
            console.log(username);
        },
        updateTour: (tour) => {
            console.log(tour);
        },
        updateUser: (user) => {
            console.log(user);
        },
        getSearchResults: (search, prop, sort) => {
            return someData.tourModule.getSearchResults(search, prop, sort);
        }
    };
}


const tourContr = tourController({ data });

const toursRouter: Router = Router();


let tourPoints = [
    {
        country: 'country1',
        city: 'city1',
        from: '01012016',
        to: '10012016'
    },
    {
        country: 'country2',
        city: 'city2',
        from: '11012016',
        to: '12012016'
    }
];

let tour1 = {
    id: 0,
    tourPoints: tourPoints,
    totalPrice: 1000,
    dateCreated: '25122015',
    createdBy: 'creator1',
    participants: ['participant1', 'participant2'],
    keywords: ['new year', 'newYear'],
    description: 'description1',
    comments: ['comment1', 'comment2', 'comment3'],
    pictures: ['picture1', 'picture2', 'picture3'],
    rating: 5,
};

let tour2 = {
    id: 1,
    tourPoints: tourPoints,
    totalPrice: 2000,
    dateCreated: '02022016',
    createdBy: 'creator2',
    participants: ['participant3', 'participant4'],
    keywords: ['cold', 'winter'],
    description: 'description2',
    comments: [''],
    pictures: ['picture4'],
    rating: 10,
};

let testingTours = [
    tour1,
    tour2
];

toursRouter.get('/', tourContr.getSearchResults)
    .get('/:id', tourContr.getTourById);

export { toursRouter };
