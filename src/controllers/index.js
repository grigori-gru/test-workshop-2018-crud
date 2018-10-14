import debug from 'debug';
import User from '../db/entity/user';

const log = debug('app');
const error = debug('app:error');
export default (router, db) => router
    .get('/favicon.ico', (req, res) => res.status(204))

    .get('/', (req, res) => res.render('index'))

    .get('/articles', async (req, res) => {
        try {
            const articles = await db.find(User);
            res.render('articles', { articles });
        } catch (err) {
            error(err);
        }
    })

    .get('/articles/new', async (req, res) => {
        res.render('new');
    })

    .get('/articles/:name/edit', async (req, res) => {
        const { name } = req.params;
        log('usersIdEdit:', name);
        const article = await db.findOne(User, { name });
        res.render('edit', { article });
    })

    .get('/articles/:name', async (req, res) => {
        const { name } = req.params;
        const article = await db.findOne(User, { name });
        if (article) {
            res.render('show', { body: article.body });
        }
        res.render('articles');
        res.status = 422;
    })

    .post('/articles', async (req, res) => {
        const { body } = req;
        // logger('body', body);
        try {
            const user = new User();
            user.name = body.name;
            user.body = body.body;

            const post = await db.save(user);
            log('Post has been saved', post);

            res.redirect(`articles/${body.name}`);
        } catch (err) {
            error('err', err);
            res.render('new');
            res.status = 422;
        }
    })

    .put('/articles/:name', async (req, res) => {
        const { body } = req;
        const { name } = req.params;
        log('req.params', req.params);
        try {
            const article = await db.findOne(User, { name });
            log('an old rticle is', article);
            const updateData = { ...article, ...body };
            log('article to update is', updateData);
            await db.save(User, updateData);

            res.redirect('/articles');
        } catch (err) {
            error('err', err);
            res.render('articles');
            res.status = 422;
        }
    })

    .delete('/articles/:name', async (req, res) => {
        const { name } = req.params;
        try {
            const article = await db.findOne(User, { name });
            log('article to remove is', article.body);
            await db.remove(article);

            res.redirect('/articles');
        } catch (err) {
            error('err', err);
            res.render('articles');
            res.status = 422;
        }
    });
