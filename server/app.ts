import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// api routes
app.use('/api/secure', (request: express.Request, response: express.Response) => {
  response.json({ success: true, message: 'home!' });
});

app.use('/api/tours_test', (request: express.Request, response: express.Response) => {
   response.json({ success: true, message: 'Tours!' });
 });

app.get('/api/tours', (req, res) => {
    res.send({
        result: testingTours
    });
});

app.get('/api/tours/:id', (req, res) => {
    //console.log(JSON.stringify(testingTours[req.params.id]));
    res.send({
        result: testingTours[req.params.id]
    });
});

if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
    console.log('----------------from catch 404 error handler');
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

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

export { app }
