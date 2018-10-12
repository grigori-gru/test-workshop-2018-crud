import { stub } from 'sinon';
import getApp from '../src';

const storageStub = {
    findAll: stub(),
    findByName: stub(),
    addArticle: stub(),
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
        storageStub.findAll.resolves([]);
        await supertest
            .get('/articles')
            .expect(200);
    });

    it('Expect GET articles/:name return 200 if article exists', async () => {
        const name = 'name';
        storageStub.findByName.withArgs(name).resolves('text');

        await supertest
            .get(`/articles/${name}`)
            .expect(200);
    });

    it('Expect POST article returns 200', async () => {
        const name = 'name';
        const body = 'body';
        storageStub.addArticle.resolves();
        await supertest
            .post('/articles')
            .send({ name, body })
            .expect(302);
    });

    // it('Expect GET articles return 200', async () => {
    //     storageStub.findAll.returns([]);
    //     await supertest
    //         .get('/')
    //         .expect(200);
    // });
});
