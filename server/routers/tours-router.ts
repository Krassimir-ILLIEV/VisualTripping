// import { Router } from 'express';
// let connectionSting: 'mongodb://localhost/VisualTripping';
// const data = require('./../data')(connectionSting);

module.exports = function ({ app, data, express }) {
    const tourController = require('./../controllers/tour-controller')({ data });
    const publicateController = require('./../controllers/publicate-controller')({ data });
    const toursRouter = new express.Router();

    toursRouter.get('/', tourController.getSearchResults)
        .post('/', publicateController.createTour)
        .get('/last', tourController.getLastTours)
        .get('/:id', tourController.getTourById)
        .post('/:id/comments', tourController.addComment);

    app.use('/api/tours', toursRouter);
};
