let mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function ({connectionString}) {
    // Override mongoose Promise, because it is depricated
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);
    const User = require('../models/user-model.js')({ mongoose });
    const Tour = require('../models/tour-model.js')({ mongoose });
    // const Country = require('../models/country-model.js');
    const City = require('../models/city-model.js')({ mongoose });
    const models = { User, Tour, /* Country,*/ City };
    const data = {};

    // It finds all properties
    // of the data models and hang them to 'data'
    fs.readdirSync('./dist/server/data')
        .filter(x => {
            return x.includes('-data') && !x.includes('.map');
        })
        .forEach(file => {
            const dataModule = require(path.join(__dirname, file))(models); //use only models

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};
