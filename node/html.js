// 路由处理 /html

const cheerio = require('cheerio');
const request = require('request');

module.exports = async (ctx, next) => {
    await new Promise((resolve, reject) => {
        const url = ctx.params.url;
        const req = request(url);

        // parse HTML
        let parse = (html) => {
            const rules = require('./match_rules.json');
            const rule = rules[url];
            if (!rule) {
                console.log('nononon');
                return ctx.throw('No Matched Rule');
            }

            const $ = cheerio.load(html, {
                normalizeWhitespace: true,
                xmlMode: true,
                decodeEntities: false
            });
            const $list = $(rule['list']);
            let items = [];
            $list && $list.each(function(i, el) {
                items.push({
                    title:  $(this).find(rule['item_title']).html(),
                    link: $(this).find(rule['item_link']).html(),
                    date: $(this).find(rule['item_date']).html(),
                    desc: $(this).find(rule['item_desc']).html(),
                    content: $(this).find(rule['item_content']).html()
                });
            });

            ctx.state.data = items;
            resolve();
        };

        // req
        let bufs = [], len = 0;
        req
            .on('error', reject)
            .on('response', function(res) {
                // `this` is `req`, which is a stream
                if (res.statusCode !== 200) {
                    this.emit('error', new Error('Bad status code ' + res.statusCode));
                }
            })
            .on('data', (chunk) => {
                bufs.push(chunk);
                len += chunk.length;
            })
            .on('end', () => {
                let html = Buffer.concat(bufs, len).toString();
                parse(html);
            });
    });

    next();
};