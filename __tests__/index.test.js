import getSupertest from 'supertest';
import { createConnection } from 'typeorm';
import getApp from '../src/app';
import { article } from './__fixtures__/test-data.json';
import User from '../src/db/entity/user';

describe('Test app', () => {
    let queryRunner;
    let connection;
    let supertest;
    let app;

    beforeEach(async () => {
        connection = await createConnection();
        queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        app = getApp(queryRunner.manager);
        supertest = getSupertest(app);

        const user = new User();
        user.name = article.name;
        user.body = article.body;

        await queryRunner.manager.save(user);
    });

    afterEach(async () => {
        await queryRunner.rollbackTransaction();
        await connection.close();
        await queryRunner.release();
    });

    it('Expect GET empty route return 200', async () => {
        await supertest
            .get('/')
            .expect(200);
    });

    it('Expect GET articles return 200', async () => {
        await supertest
            .get('/articles')
            .expect(200);
    });

    it('Expect GET articles/:name return 200 if article exists', async () => {
        await supertest
            .get(`/articles/${article.name}`)
            .expect(200);
    });

    it('Expect POST article returns 200', async () => {
        const data = { name: 'name', body: 'body' };
        await supertest
            .post('/articles')
            .send(data)
            .expect(302);
    });

    it('Expect DELETE articles return 302', async () => {
        await supertest
            .delete(`/articles/${article.name}`)
            .expect(302);
    });

    it('Expect PUT article return 302', async () => {
        const { name } = article;
        const data = { name, body: 'new body' };
        await supertest
            .put(`/articles/${name}`)
            .send(data)
            .expect(302);
    });
});
