const Koa = require('koa');
const Router = require('koa-router');

const schedule = require('./schedule.js');

const header = require('./header.js');
const json = require('./json.js');
const onerror = require('./onerror.js');

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
    .get('/index', require('./index.js'))
    .get('/rss/:url', require('./rss.js'))
    .get('/html/:url', require('./html.js'))
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
