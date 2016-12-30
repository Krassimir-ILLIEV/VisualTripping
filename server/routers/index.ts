module.exports = function ({ app, data, fs, path, express }) {

    // It finds all properties
    // of the data models and hang them to "data"
    fs.readdirSync('./dist/server/routers')
        .filter(x => x.includes('-router') && !x.includes('.map'))
        .forEach(file => {
            require(path.join(__dirname, file))({ app, data, express });
        });
};
