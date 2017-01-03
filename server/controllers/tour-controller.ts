module.exports = function ({ data }) {
    return {
        getTourById(req, res) {
            data.getTourById(req.params.id)
                .then(tour => {
                    res.status(200)
                        .json({ tour });
                })
                .catch(err => {
                    console.log(`TOUR ${err} DOESNT EXIST`);
                    res.status(404)
                        .json({ success: false, message: `tour does not exist` });
                });
        },
        // TODO: Fix nested promises!
        postUserInTour(req, res) {
            data.getTourById(req.params.id)
                .then(tour => {
                    return new Promise((resolve, reject) => {
                        if (tour.isUserExist(req.body.username)) {
                            return reject('You are already added in tour');
                        }

                        if (tour.getUserCount >= tour.maxUser) {
                            return reject('Max users for tour are reached');
                        }

                        data.getUserByUsername(req.body.username)
                            .then(user => {
                                const dataCollection = {
                                    user,
                                    tour
                                };
                                return resolve(dataCollection);
                            })
                            .catch(err => {
                                console.log(err);
                                return reject('User doent exist');
                            });
                    });
                })
                .then(dataCollection => {
                    dataCollection.tour.usersInTour.push(req.body.username);
                    console.log(data);

                    return data.updateTour(dataCollection.tour)
                        .then(tour => {
                            const dataUp = {
                                tour: tour,
                                user: dataCollection.user
                            };
                            console.log(`DATA UP ==> ${dataUp}`);
                            return dataUp;
                        })
                        .catch(err => {
                            // MAY BE IT iS WRONG!
                            console.log(err);
                            return err;
                        });
                })
                .then(dataCollection => {
                    const userTourData = {
                        tourId: dataCollection.tour.getId,
                        tourTitle: dataCollection.tour.headline,
                        tourCountry: dataCollection.tour.country,
                        tourCity: dataCollection.tour.city,
                        isDeleted: 'false'
                    };

                    console.log(dataCollection.user);
                    dataCollection.user.userBoughtTours.push(userTourData);

                    return data.updateUser(dataCollection.user);
                })
                .then(user => {
                    res.status(200)
                        .json({ success: true, message: `${user.username} joined tour successfully!` });
                })
                .catch(err => {
                    console.log(err);
                    res.json({ success: false, message: 'Error: can not join tour!' });
                });
        },
        getSearchResults(req, res) {

            const isValid = true;
            const isDeleted = false;
            let city = new RegExp('.+');
            let country = new RegExp('.+');
            let beginTourDate: any;
            let endTourDate: any;

            let search = {
                isValid,
                isDeleted,
                city,
                country,
                beginTourDate,
                endTourDate
            };

            search.isValid = isValid;
            search.isDeleted = isDeleted;
            if (req.query.city) {
                const string = req.query.city;
                city = new RegExp(['^', string, '$'].join(''), 'i');
                search.city = city;
            }

            if (req.query.country) {
                const string = req.query.country;
                country = new RegExp(['^', string, '$'].join(''), 'i');
                search.country = country;
            }

            if (req.query.start) {
                let date = new Date(`${req.query.start}`);
                // Can change => $gt => $gte
                search.beginTourDate = { $gt: date };
            }

            if (req.query.end) {
                let fixDay = 2;
                let date = new Date(`${req.query.end}`);
                // Can change => $lt => $lte
                date.setDate(date.getDate() + fixDay);

                search.endTourDate = { $lt: date };
            }

            data.getSearchResults(search, {}, { sort: { endJoinDate: +1 } })
                .then(tours => {
                    res.status(200)
                        .json({ tours });
                })
                .catch(err => {
                    console.log(err);
                    res.status(404)
                        .json({ success: false, message: 'ERROR WHEN SEARCH' });
                });
        },
        getLastTours(req, res) {
            data.getLastTours()
                .then(topTours => {
                    let tours = topTours.map(t => {
                        return {
                            title: t.title,
                            url: t.pictures[0] || 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg',
                            id: t._id
                        };
                    });
                    res.status(200).json({ tours });
                })
                .catch(err => { res.status(400).json({ success: false, message: 'error' }); });
        },
        addComment(req, res) {
            console.log(req.user);

            data.getTourById(req.body.tourId.id)
                .then((tour) => {
                    let comment = req.body.comment;
                    comment.userAvatar = req.user.avatar;
                    tour.comments.push(comment);

                    return data.updateTour(tour);
                })
                .then(() => {
                    res.json({ success: true, message: 'Your comment was published successfully' });
                });
        },
        joinTo(req, res) {
            // console.log('--------------user: '+req.body.tourId+'...'+req.body.user);
            data.getTourById(req.body.tourId)
                .then((tour) => {
                    let user = req.body.user;
                    let toJoin = req.body.toJoin;
                    if (!toJoin) {
                        let i = tour.usersInTour.indexOf(user);
                        if (i > -1) {
                            tour.usersInTour.splice(i, 1);
                        }
                    } else {
                        tour.usersInTour.push(user);
                    }
                    return data.updateTour(tour);
                })
                .then(() => {
                    res.json({ success: true, message: 'Your joined the tour successfully' });
                });
        }

    };
};
