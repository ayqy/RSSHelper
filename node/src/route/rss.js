// route /rss:url?callback

const fetch = require('../fetch/fetch.js');

module.exports = async (ctx, next) => {
    await new Promise((resolve, reject) => {
        const url = ctx.params.url;

        let onsuccess = (data = {}) => {
            ctx.state.data = data;
            resolve();
        };
        let onerror = reject;
        fetch('rss', url)
            .on('success', onsuccess)
            .on('error', onerror)
    });

    next();
}
