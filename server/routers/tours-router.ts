// import { Router } from 'express';
// let connectionSting: 'mongodb://localhost/VisualTripping';
// const data = require('./../data')(connectionSting);

module.exports = function ({ app, data, express }) {
    const tourController = require('./../controllers/tour-controller')({ data });
    const toursRouter = new express.Router();

    toursRouter.get('/', tourController.getSearchResults)
        .get('/:id', tourController.getTourById);

    app.use('/api/tours', toursRouter);
};
