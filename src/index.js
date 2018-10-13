import container from './container';
import getApp from './app';

export default async () => {
    const db = await container();
    return getApp(db);
};
