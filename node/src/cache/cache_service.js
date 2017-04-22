// cache service for schedule

const fetch = require('../fetch/fetch.js');

const index = require('../config/index.json');

// cache data
let cache = function() {
    for (let cate in index) {
        index[cate].forEach((item) => {
            fetch(item.type, item.url, true)
                .on('error', (error) => {
                    console.error('CacheService fetch error ' + error.message);
                })
                .on('success', (data) => {
                    console.log('CacheService cached ' + item.url);
                })
                .on('cancel', (reason) => {
                    console.log('CacheService fetch cancel ' + reason);
                })
        });
    }
};


module.exports = {
    run: () => {
        cache();
    }
};
