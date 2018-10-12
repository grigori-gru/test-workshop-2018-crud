import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import getRoutes from './controllers';
import container from './container';

export default (storage = container) => {
    const app = express();

    // app.get('/', (req, res) => res.send('Hello World!'));

    const routes = getRoutes(new express.Router(), storage);
    app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
    app.set('view engine', 'pug');
    app.use('/', routes);
    app.set('views', path.join(__dirname, 'views'));

    // Not found endpoint
    app.use((req, res, next) => {
        next(new Error(`Not found endpoint ${req.method} ${req.originalUrl}`));
    });

    return app;
};
