import { stub } from 'sinon';
import getApp from '../src/app';

const storageStub = {
    find: stub(),
    findOne: stub(),
    save: stub(),
    remove: stub(),
};

const app = getApp(storageStub);
const supertest = require('supertest')(app);

describe('Test app', () => {
    beforeEach(() => {
        Object.values(storageStub).forEach(stubed => stubed.reset());
    });

    it('Expect GET empty route return 200', async () => {
        await supertest
            .get('/')
            .expect(200);
    });

    it('Expect GET articles return 200', async () => {
        storageStub.find.resolves([]);
        await supertest
            .get('/articles')
            .expect(200);
    });

    it('Expect GET articles/:name return 200 if article exists', async () => {
        const name = 'name';
        storageStub.findOne.withArgs({ name }).resolves({ body: 'text' });

        await supertest
            .get(`/articles/${name}`)
            .expect(200);
    });

    it('Expect POST article returns 200', async () => {
        const name = 'name';
        const body = 'body';
        storageStub.save.resolves();
        await supertest
            .post('/articles')
            .send({ name, body })
            .expect(302);
    });

    it('Expect DELETE articles return 302', async () => {
        const name = 'name';
        const data = { id: 1, name, body: 'body' };
        storageStub.findOne.resolves(data);
        storageStub.remove.withArgs(data).resolves();
        await supertest
            .delete(`/articles/${name}`)
            .expect(302);
    });

    it('Expect PUT article return 302', async () => {
        const name = 'name';
        const data = { id: 1, name, body: 'body' };
        const dataToUpdate = { id: 1, name: 'newname', body: 'body' };
        storageStub.findOne.resolves(data);
        storageStub.save.withArgs(dataToUpdate).resolves();
        await supertest
            .put(`/articles/${name}`)
            .expect(302);
    });
});
