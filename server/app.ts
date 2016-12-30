import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import { app } from './config/application';

import { toursRouter } from './routers/tours-router';

// api routes
app.use('/api/tours', toursRouter);

if (app.get('env') === 'production') {

    // in production mode run application from dist folder
    app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
    console.log('----------------from catch 404 error handler');
    let err = new Error('Not Found');
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
