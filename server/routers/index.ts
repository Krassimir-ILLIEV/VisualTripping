const authMiddleware = require('./../middlewares/auth-middleware');

module.exports = function ({ app, data, fs, path, express }) {
    fs.readdirSync('./dist/server/routers')
        .filter(x => x.includes('-router') && !x.includes('.map'))
        .forEach(file => {
            require(path.join(__dirname, file))({ app, data, express, authMiddleware });
        });
};
