import logger from 'debug';
import { createConnection } from 'typeorm';
import User from './db/entity/user';

const log = logger('app');

export default async () => {
    try {
        const connection = await createConnection();
        log('Connection created');

        return connection.getRepository(User);
    } catch (error) {
        log(error);
        return false;
    }
};
