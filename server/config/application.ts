// 'use strict';

// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as compression from 'compression';

// const app = express();

// app.disable('x-powered-by');

// app.use(bodyParser.json());
// app.use(compression());
// app.use(bodyParser.urlencoded({ extended: true }));

// export { app };

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = function ({ data, express }) {
    const app = express();

    app.disable('x-powered-by');

    //app.use('/static', express.static(path.resolve(__dirname + '/../../public')));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: 'purple unicorn' }));

    require('./passport')({ app, data });

    return app;
};
