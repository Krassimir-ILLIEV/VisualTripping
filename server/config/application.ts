'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));

export { app };
