// convert data to JSON

module.exports = (ctx, next) => {
    const data = ctx.state.data;
    const callback = ctx.query.callback;

    if (data) {
        let res = null;
        try {
            res = JSON.stringify({
                code: 200,
                data: data
            });
        } catch(ex) {
            ctx.state.error = ex;
            next();
        }
        if (callback) {
            res = callback + '(' + res + ')';
        }
        ctx.body = res;
    }

    next();
};