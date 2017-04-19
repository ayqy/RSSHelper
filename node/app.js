const Koa = require('koa');
const Router = require('koa-router');

const header = require('./header.js');
const json = require('./json.js');
const onerror = require('./onerror.js');

const PORT = 8888;


let app = new Koa();
let router = new Router();


// router
router
    .get('/', function (ctx, next) {
        ctx.body = 'RSSHelper';
    })
    .get('/index', require('./index.js'))
    .get('/rss/:url', require('./rss.js'))
    .get('/html/:url', function (ctx, next) {
        ctx.body = 'html ' + ctx.params.url;
    });
app
    .use(router.routes())
    // .use(router.allowedMethods())

// custom middlewares
app
    .use(header)
    .use(json)
    .use(onerror)


// startup
app.listen(PORT);
console.log('listening ' + PORT);