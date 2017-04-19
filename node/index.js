// 路由处理 /index

module.exports = (ctx, next) => {
    const index = require('./index.json');
    ctx.state.data = index;

    next();
};