module.exports = function ({mongoose}) {
    const tourSchema = new mongoose.Schema({
        creator: String,
        title: { type: String, required: true },
        city: { type: String },
        country: { type: String },
        description: String,
        price: Number,
        maxUser: Number,
        endJoinDate: Date,
        beginTourDate: Date,
        endTourDate: Date,
        isValid: Boolean,
        isDeleted: Boolean,
        comments: [],
        usersInTour: [],
        tourPoints: [{
            country: String,
            city: String,
            startDate: Date,
            duration: Number
        }],
        pictures: [String],
        rating: Number
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
