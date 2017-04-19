// 路由处理 /rss:url?callback

const FeedParser = require('feedparser');
// for fetching the feed
const request = require('request');


module.exports = async (ctx, next) => {
    await new Promise((resolve, reject) => {
        const url = ctx.params.url;

        const req = request(url);
        const feedparser = new FeedParser();

        let err = (error) => {
            ctx.state.error = error;

            next();
            reject();
        };

        // req
        req.on('error', err);
        req.on('response', function(res) {
            // `this` is `req`, which is a stream
            if (res.statusCode !== 200) {
                this.emit('error', new Error('Bad status code ' + res.statusCode));
            } else {
                this.pipe(feedparser);
            }
        });

        // parse
        feedparser.on('error', err);
        let items = [];
        feedparser.on('readable', function() {
            // `this` is `feedparser`, which is a stream
            // **NOTE** the "meta" is always available in the context of the feedparser instance
            // let meta = this.meta;
            let item;

            while (item = this.read()) {
                items.push(item);
            }
        });
        feedparser.on('end', (error) => {
            if (error) return err(error);
            ctx.state.data = items;

            next();
            resolve();
        });
    })
}
