const Koa = require('koa');
const Router = require('koa-router');

const header = require('./header.js');
const json = require('./json.js');
const onerror = require('./onerror.js');

const PORT = 7777;


let app = new Koa();
let router = new Router();

// 中间件错误全局捕获
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