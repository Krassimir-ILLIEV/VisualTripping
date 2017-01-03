module.exports = function ({ data }) {
    return {
        getLoggedUserData(req, res) {
            data.getUserByUsername(req.user.username)
                .then(user => {
                    const profile = {
                        user: {
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            avatar: user.avatar,
                            isLogged: true,
                            userOfferTours: user.userOfferTours,
                            userBoughtTours: user.userBoughtTours
                        }
                    };
                    res.status(200)
                        .json(profile);
                })
                .catch(err => {
                    console.log(`USER ${err} DOESNT EXIST`);
                    res.status(404)
                        .send(`USER ${err} DOESNT EXIST`);
                });
        },
        getUserByUsername(req, res) {
            data.getUserByUsername(req.params.username)
                .then(foundUser => {
                    let user = {
                        username: foundUser.username,
                        firstname: foundUser.firstname,
                        lastname: foundUser.lastname,
                        avatar: foundUser.avatar,
                        userOfferTours: foundUser.userOfferTours
                    };
                    res.status(200)
                        .json(user);
                })
                .catch(err => {
                    console.log(`USER ${err} DOESN'T EXIST`);
                    res.status(404)
                        .send(`USER ${err} DOESN'T EXIST`);
                });
        },
        updateUserProfile(req, res) {
            const username = req.user.username;

            data.getUserByUsername(username)
                .then(user => {
                    user.firstname = req.body.firstname || user.firstname;
                    user.lastname = req.body.lastname || user.lastname;
                    user.email = req.body.email || user.email;
                    user.city = req.body.city || user.city;
                    user.country = req.body.country || user.country;
                    user.avatar =  req.body.avatar || user.avatar;

                    return data.updateUser(user);
                })
                .then(user => {
                    console.log(`USER ${user.username} HAS BEEN SUCCESFULLY UPDATED!`);

                    res.status(200).json({ success: true, message: 'profile updated successfully' });
                })
                .catch(err => {
                    console.log(`UPDATE FAILED! ${req.user.username} :${err}`);
                    res.status(404)
                        .send('PROFILE UPDATE FAILED');
                });
        }
    };
};
