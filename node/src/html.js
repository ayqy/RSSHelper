// route /html

const fetch = require('./fetch.js');

module.exports = async (ctx, next) => {
    await new Promise((resolve, reject) => {
        const url = ctx.params.url;

        let onsuccess = (data) => {
            data = data || {};
            ctx.state.data = data;
            resolve();
        }
        let onerror = reject;
        fetch('html', url)
            .on('success', onsuccess)
            .on('error', onerror)
    });

    next();
};