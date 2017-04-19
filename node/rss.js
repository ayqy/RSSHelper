// 路由处理 /rss:url?callback

const FeedParser = require('feedparser');
const request = require('request');


module.exports = async (ctx, next) => {
    await new Promise((resolve, reject) => {
        const url = ctx.params.url;
        const feedparser = new FeedParser();
        const req = request(url);

        // req
        req
            .on('error', reject)
            .on('response', function(res) {
                if (res.statusCode !== 200) {
                    this.emit('error', new Error('Bad status code ' + res.statusCode));
                } else {
                    this.pipe(feedparser);
                }
            });

        // parse
        let items = [];
        feedparser
            .on('error', reject)
            .on('readable', function() {
                let item;
                while (item = this.read()) {
                    items.push(item);
                }
            })
            .on('end', (error) => {
                if (error) return reject(error);
                ctx.state.data = items;
                resolve();
            });
    });

    next();
}
