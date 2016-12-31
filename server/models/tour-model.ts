// mongoose = require('mongoose');
module.exports = function ({mongoose}) {
    const tourSchema = new mongoose.Schema({
        creator: String,
        title: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        description: String,
        price: Number,
        maxUser: Number,
        endJoinDate: Date,
        beginTourDate: Date,
        endTourDate: Date,
        isValid: Boolean,
        isDeleted: Boolean,
        usersInTour: []
    });

    tourSchema.virtual('getUserCount').get(function () {
        let usersCount = this.usersInTour.length;

        return usersCount;
    });

    tourSchema.virtual('getId').get(function () {
        let tourId = this._id.toString();

        return tourId;
    });

    tourSchema.methods.isUserExist = function (username) {
        let isUserExist = this.usersInTour.includes(username);

        return isUserExist;
    };

    mongoose.model('tour', tourSchema);

    return mongoose.model('tour');
};
