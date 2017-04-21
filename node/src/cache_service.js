// cache service for schedule

const fetch = ('./fetch.js');

const index = require('./config/index.json');

// cache data
let cache = function() {
    for (let cate in index) {
        index[cate].forEach((item) => {
            fetch(item.type, item.url);
        });
    }
};


module.exports = {
    run: () => {
        cache();
    }
};