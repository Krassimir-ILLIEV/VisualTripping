module.exports = function ({ data }) {
    const validator = require('./../utils/validator');
    return {
        get(req, res) {

            if (!req.user) {
                res.status(401)
                    .render('not-login');
            } else {
                Promise.all([data.getAllCountries('name'), data.getAllCities('name')])
                    .then(([countries, cities]) => {
                        const user = {
                            isLogged: !!req.user
                        };

                        res.status(200)
                            .render('publish-travel', { user, countries, cities });
                    });
            }
        },
        createTour(req, res) {
            const fixDay = 1;
            let endJoinDate = new Date(`${req.body.endJoinDate}`);
            endJoinDate.setDate(endJoinDate.getDate() + fixDay);
            req.body.endJoinDate = endJoinDate;

            let beginTourDate = new Date(`${req.body.beginTourDate}`);
            beginTourDate.setDate(beginTourDate.getDate() + fixDay);
            req.body.beginTourDate = beginTourDate;

            let endTourDate = new Date(`${req.body.endTourDate}`);
            endTourDate.setDate(endTourDate.getDate() + fixDay);
            req.body.endTourDate = endTourDate;

            if (!validator.validateString(req.body.title, 1)) {
                res.status(400).json({ success: false, message: 'Name of advertisement is required!' });
            } else {
                const user = req.user.username;
                const tourDetails = req.body;
                tourDetails.creator = user;
                tourDetails.isDeleted = false;
                tourDetails.isValid = true;
                data.createTour(tourDetails)
                    .then(tour => {
                        const userTourData = {
                            userOfferTours: {
                                tourId: tour.getId,
                                tourTitle: tour.headline,
                                tourCountry: tour.country,
                                tourCity: tour.city,
                                isDeleted: 'false'
                            }
                        };
                        return data.updateUserProperty(user, userTourData);
                    })
                    .then((tour) => {
                        res.status(200)
                            .json({ message: 'success-publish' });
                    })
                    .catch(err => {
                        console.log(`TOUR ${err} CANT BE CREATED`);
                        res.status(404)
                            .send(`TOUR ${err} CANT BE CREATED`);
                    });
            }
        },
        // UNDERCONSTRUCTION!!
        removeTour(req, res) {
            if (!req.user) {
                return res.status(401)
                    .render('not-login');
            }

            const tourId = req.params.id;

            data.getTourById(tourId)
                .then(tour => {
                    if (req.user.username !== tour.creator) {
                        res.send('NOT AUTHORIZED');
                    }
                    tour.isDeleted = 'true';
                    tour.isValid = 'false';

                    return data.updateTour(tour);
                })
                .then(updatedTour => {
                    console.log('UPDATED TOUR======>' + updatedTour.headline);
                    return data.getUserByUsername(updatedTour.creator);
                })
                .then(tourCreator => {
                    console.log('CREATOR OF TOUR====>' + tourCreator.username);
                    tourCreator.userOfferTours.forEach(tour => {
                        if (tour.tourId === `${req.params.id}`) {
                            tour.isDeleted = 'true';
                            return;
                        }
                    });
                    return data.updateUserFields(tourCreator.username, { userOfferTours: tourCreator.userOfferTours });
                })
                .then(() => {
                    const search = {
                        userBoughtTours: {
                            $elemMatch: {
                                tourId: `${req.params.id}`
                            }
                        }
                    };

                    return data.getUsersBySpecificCriteria(search);
                })
                .then(users => {
                    users.forEach(x => {
                        x.userBoughtTours.forEach(tour => {
                            if (tour.tourId === `${req.params.id}`) {
                                tour.isDeleted = 'true';
                                return;
                            }
                        });
                    });
                    return Promise.resolve(users);
                })
                .then(users => {
                    return Promise.all(users.map(user => data.updateUserFields(user.username, { userBoughtTours: user.userBoughtTours })));
                })
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    console.log('ERROOOOR =====>' + err);
                    res.send(err);
                });
        }
    };
};