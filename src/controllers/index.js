import debug from 'debug';

const logger = debug('app');

export default (router, db) => router
    .get('/', (req, res) => res.render('index'))

    .get('/articles', async (req, res) => {
        const conDb = await db;
        console.log(conDb);
        const articles = await conDb.find();
        console.log(articles);
        res.render('articles', { articles });
    })

    .get('/articles/new', async (req, res) => {
        res.render('new');
    })

    .get('/articles/:name', async (req, res) => {
        const { name } = req.params;
        const article = await db.findByName(name);
        res.render('show', { article });
    })

    .post('/articles', async (req, res) => {
        const { body } = req;
        logger('body', body);
        try {
            await db.save(body);
            res.redirect(`show/${body.name}`);
        } catch (error) {
            logger('error', error);
            res.render('new');
            res.status = 422;
        }
    });

//     .put('/articles/:name', async (req, res) => {

//     })

//     .delete('/articles/:name', async (req, res) => {

// });
