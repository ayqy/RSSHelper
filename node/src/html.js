// 路由处理 /html

const cheerio = require('cheerio');
const request = require('request');

const POST_COUNT = 10;

module.exports = async (ctx, next) => {
    await new Promise((resolve, reject) => {
        const url = ctx.params.url;
        const req = request({
            url: url,
            timeout: 3600
        });

        // parse HTML
        let parse = (html) => {
            const rules = require('./config/match_rules.json');
            const rule = rules[url];
            if (!rule) {
                return reject(new Error('No Matched Rule'));
            }

            const $ = cheerio.load(html, {
                normalizeWhitespace: true,
                xmlMode: true,
                decodeEntities: false
            });
            const $list = $(rule['list']);
            let items = [];
            $list && $list.each(function(i, el) {
                if (i > POST_COUNT - 1) return;
                items.push({
                    title:  $(this).find(rule['item_title']).text() || '',
                    link: $(this).find(rule['item_link']).attr('href') || '',
                    date: $(this).find(rule['item_date']).text() || '',
                    desc: $(this).find(rule['item_desc']).html() || '',
                    content: $(this).find(rule['item_content']).html() || ''
                });
            });

            ctx.state.data = {
                title: $('title').text(),
                items: items
            };
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