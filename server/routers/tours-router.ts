module.exports = function ({ app, data, express, authMiddleware }) {
    const tourController = require('./../controllers/tour-controller')({ data });
    const cityController = require('./../controllers/city-controller')({ data });
    const publicateController = require('./../controllers/publicate-controller')({ data });
    const toursRouter = new express.Router();

    toursRouter.get('/', tourController.getSearchResults)
        .get('/cities', cityController.getAllCitiesList)
        .post('/', authMiddleware.isAuthenticated, publicateController.createTour)
        .get('/last', tourController.getLastTours)
        .get('/:id', tourController.getTourById)
        .post('/:id/comments', authMiddleware.isAuthenticated, tourController.addComment);

    app.use('/api/tours', toursRouter);
};
