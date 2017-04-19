// 设置header

module.exports = (ctx, next) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
    };
    ctx.set(headers);

    next();
};