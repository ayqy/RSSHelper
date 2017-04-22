// route /index

module.exports = (ctx, next) => {
    const index = require('../config/index.json');
    ctx.state.data = index;

    next();
};