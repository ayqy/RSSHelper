// 路由处理 /rss:url?callback

const FeedParser = require('feedparser');
const request = require('request');

const deepPath = require('./util/deep_path.js');


module.exports = async (ctx, next) => {
    await new Promise((resolve, reject) => {
        const url = ctx.params.url;
        const feedparser = new FeedParser();
        const req = request({
            url: url,
            timeout: 3600
        });

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

                if (items.length) {
                    let data = {
                        title: deepPath(items[0], ['meta', 'title']),
                        items: []
                    };
                    data.items = items.map((item) => {
                        return {
                            title: item.title,
                            link: item.link,
                            date: item.date,
                            desc: item.summary,
                            content: item.description
                        };
                    });
                    ctx.state.data = data;
                }

                resolve();
            });
    });

    next();
}
