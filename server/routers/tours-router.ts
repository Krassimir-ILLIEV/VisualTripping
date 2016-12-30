import { Router, Response, Request } from 'express';

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

toursRouter.get('/', (req: Request, res: Response) => {
    res.json({ testingTours });
})
    .get('/:id', (req: Request, res: Response) => {
        res.json({
            result: testingTours[req.params.id]
        });
    });

export { toursRouter };
