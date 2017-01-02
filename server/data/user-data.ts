module.exports = function(models) {
    const { User } = models;
    const encrypt = require('./../utils/encrypt');
    const defaultAvatar = 'http://4.bp.blogspot.com/-BQrZkt74Maw/Ts_F1SMewmI/AAAAAAAAAKQ/5wvGgJzl8A0/s1600/linux-mac-windows.png';

    return {
        createUser(userInfo) {
            const salt = encrypt.generateSalt();

            let user = new User({
                username: userInfo.username,
                salt: salt,
                passHash: encrypt.hashPassword(salt, userInfo.password || encrypt.genenerateRandomPassword()),
                email: userInfo.email,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                age: userInfo.age,
                country: userInfo.country,
                city: userInfo.city,
                avatar: userInfo.avatar || defaultAvatar
            });

            return new Promise((resolve, reject) => {

                console.log("CREATING USER...");

                User.create(user, (err, user) => {
                    if (err) {

                        console.log("CAN NOT CREATE USER");
                        return reject(err);
                    }

                    console.log("USER CREATED!");
                    return resolve(user);
                });
            });
        },
        createUserFromFacebook(userInfo) {
            let user = new User({
                username: userInfo.username,
                salt: userInfo.salt,
                passHash: userInfo.passHash,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                avatar: userInfo.avatar || defaultAvatar
            });

            return new Promise((resolve, reject) => {

                console.log("CREATING FACEBOOK USER...");

                User.create(user, (err, user) => {
                    console.log(user);
                    if (err) {

                        console.log("CAN NOT CREATE FACEBOOK USER");
                        return reject(err);
                    }

                    console.log("FACEBOOK USER CREATED!");
                    return resolve(user);
                });
            });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {
                console.log(`Searching for user by ${id}`);
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        console.log(`${id} was not found`);
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByQuery(query) {
            return new Promise((resolve, reject) => {
                User.findOne(query, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                console.log(`SEARCHING FOR USER ${username}`);

                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        console.log("ERROR WHEN TRY TO CONNECT THE SERVER");
                        return reject(err);
                    }

                    if (!user) {
                        console.log(`USER: ${username} WAS NOT FOUND`);
                        return reject(username);
                    }

                    console.log(`USER ${username} WAS FOUND`);
                    return resolve(user);
                });
            });
        },
        getUserByRange(page, size) {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR USER COLLECTION...");
                User.find()
                    .skip(page * size)
                    .limit(size)
                    .exec((err, users) => {
                        if (err) {
                            console.log("COLLECTION FROM USERS WAS NOT FOUND");
                            return reject(err);
                        }

                        console.log("COLLECTION FROM USERS WAS FOUND");
                        return resolve(users);
                    });
            });
        },
        getUserByCredentials(username, password) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, password }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL USERS...");
                User.find({}, (err, users) => {
                    if (err) {
                        console.log("ERROR WHEN GET ALL USERS!");
                        return reject(err);
                    }

                    console.log("USERS FOUND!");
                    return resolve(users);
                });
            });
        },
        getUsersBySpecificCriteria(params) {
            return new Promise((resolve, reject) => {
                console.log(`SEARCHING FOR USERS WITH SPECIFIC PARAMS: ${params}`);
                User.find(params, function(err, users) {
                    if (err) {
                        console.log(`ERROR WHEN SEARCHING ${params}`);
                        return reject(err);
                    }
                    // Send the list of all users in database with specific params
                    // Very possible this will be an array with just one user object in it.
                    console.log(`USERS FOUND ${users}`);
                    return resolve(users);
                });
            });
        },
        updateUserProperty(username, updateData) {
            return new Promise((resolve, reject) => {
                User.update({ username: username }, { $push: updateData },
                    (err, updatedUser) => {
                        if (err) {
                            console.log(`ERROR WHEN UPDATE USER:${username}`);
                            return reject(err);
                        }

                        let tour = updateData.userOfferTours;
                        console.log(`USER ${username} UPDATED SUCCESSFULLY`);
                        // resolve now returns tour as well, allowing easier navigation to new tour.
                        return resolve({ username, tour });
                    });
            });
        },
        updateUserFields(username, updateData) {
            return new Promise((resolve, reject) => {
                User.update({ username: username }, { $set: updateData },
                    (err, updatedUser) => {
                        if (err) {
                            console.log(`ERROR WHEN UPDATE USER:${username}`);
                            return reject(err);
                        }

                        console.log(`USER ${username} UPDATED SUCCESSFULLY`);
                        return resolve(updatedUser);
                    });
            });
        },
        updateUser(user) {
            console.log("UPDATE IS CALLED ==========> " + user);
            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("UPDATE FINISH <=========" + user);
                    return resolve(user);
                });
            });
        }
    };
};
