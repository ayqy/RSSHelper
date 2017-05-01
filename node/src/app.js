const Koa = require('koa');
const Router = require('koa-router');

const schedule = require('./schedule.js');

const header = require('./middleware/header.js');
const json = require('./middleware/json.js');
const onerror = require('./middleware/onerror.js');

const PORT = 7777;

// fix DNS timeout
process.env.UV_THREADPOOL_SIZE = 128;

// global catch
process.on('uncaughtException', (error) => {
    console.error('uncaughtException ' + error);
});

let app = new Koa();
let router = new Router();

// global catch for middles error
app.use(onerror);

// router
router
    .get('/', function (ctx, next) {
        ctx.body = 'RSSHelper';
    })
    .get('/index', require('./route/index.js'))
    .get('/rss/:url', require('./route/rss.js'))
    .get('/html/:url', require('./route/html.js'))
    .get('/pipe', require('./route/pipe.js'))
app
    .use(router.routes())
    .use(router.allowedMethods())

// custom middlewares
app
    .use(header)
    .use(json)


// global onerror
app.on('error', (err, ctx) => {
    ctx.body = JSON.stringify({
        code: -1,
        data: err.message
    });
    //...log
});


// startup
app.listen(PORT);
console.log('listening ' + PORT);
schedule.start();
console.log('schedule task started');
