module.exports = function ({mongoose}) {
    let allRoles = ['admin', 'moderator', 'regular'];

    const userSchema = new mongoose.Schema({
        username: { type: String, validate: /[a-zA-Z0-9]+/, required: true, unique: true },
        salt: { type: String, required: true },
        passHash: { type: String, required: true },
        email: { type: String },
        avatar: { type: String },
        firstname: { type: String, validate: /[a-zA-Z]+/, required: true },
        lastname: { type: String, validate: /[a-zA-Z]+/, required: true },
        age: { type: Number, min: 0, max: 150 },
        country: { type: String },
        city: { type: String },
        userOfferTours: [{}],
        userBoughtTours: [{}],
        roles: { type: [String], default: 'regular', enum: allRoles }
    });

    mongoose.model('user', userSchema);

    return mongoose.model('user');
};
