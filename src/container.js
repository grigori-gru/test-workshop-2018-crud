import { createConnection } from 'typeorm';
import User from './db/entity/user';

// import dotenv from 'dotenv';

// dotenv.config();
// let dbUrl;

// switch (process.env.NODE_ENV) {
// case 'production':
//     dbUrl = process.env.DATABASE_URL;
//     break;
// case 'test':
//     dbUrl = process.env.DATABASE_URL_TEST;
//     break;
// default:
//     dbUrl = process.env.DATABASE_URL_DEV;
// }

export default createConnection()
    .then((connection) => {
        console.log('We get connection');
        return connection.getRepository(User);
    })
    .catch((err) => {
        console.error(err);
    });
