// 中间件错误捕获

module.exports = (ctx, next) => {
    const callback = ctx.query.callback;

    if (ctx.state.error) {
        let errBody = JSON.stringify({
            code: -1,
            data: ctx.state.error.message
        });
        if (callback) errBody = callback + '(' + errBody + ')';
        ctx.body = errBody;
    }

    next();
};