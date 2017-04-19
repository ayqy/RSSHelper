// 中间件全局错误捕获

module.exports = async (ctx, next) => {
    const callback = ctx.query.callback;

    try {
        await next();
    } catch (err) {
        err.status = err.statusCode || err.status || 500;
        let errBody = JSON.stringify({
            code: -1,
            data: err.message
        });
        if (callback) errBody = callback + '(' + errBody + ')';
        ctx.body = errBody;
    }
};