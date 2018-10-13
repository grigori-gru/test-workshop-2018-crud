import logger from 'debug';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import getRoutes from './controllers';

const error = logger('app:error');

export default (storage) => {
    try {
        const app = express();

        app.use(methodOverride('_method'));
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
    } catch (err) {
        error('Error in app', err);
        return err;
    }
};
