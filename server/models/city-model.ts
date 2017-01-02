/* global require module*/
// const mongoose = require("mongoose");

module.exports = function ({mongoose}) {
    const citySchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String, required: false },
        pictureUrl: { type: String, required: false },
        cityUrl: { type: String, required: false },
        country: { type: {}, required: false }
    });

    mongoose.model('city', citySchema);

    return mongoose.model('city');
};
