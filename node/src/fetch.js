// fetch RSS & HTML data

const events = require('events');

const request = require('request');
const FeedParser = require('feedparser');
const cheerio = require('cheerio');

const cache = require('./cache.js');
const deepPath = require('./util/deep_path.js');

const POST_COUNT = 10;
const TIMEOUT = 9000;

let fetch = (type, url, noCache) => {
    // event bus for one fetch
    let emitter = new events.EventEmitter();
    let onerror = (error) => {
        emitter.emit('error', error);
    };
    let onsuccess = (data) => {
        emitter.emit('success', data);
        data && cache.set(url, data);
    };
    let fetchNow = () => {
        if (type === 'rss') {
            rss(url, onsuccess, onerror);
        }
        else if (type === 'html') {
            html(url, onsuccess, onerror);
        }
    };
    if (noCache) {
        console.log('schedule force fetch now');
        fetchNow();
    }
    else {
        cache.get(url, (data) => {
            if (data) emitter.emit('success', data);
            else fetchNow();
        });
    }

    return emitter;
};
let rss = (url, onsuccess, onerror) => {
    const req = request({
        url: url,
        timeout: TIMEOUT
    }, (error) => {if (error) onerror(error)});
    const feedparser = new FeedParser();

    // req
    req
        .on('error', onerror)
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
        .on('error', onerror)
        .on('readable', function() {
            let item;
            while (item = this.read()) {
                if (items.length < POST_COUNT) {
                    items.push(item);
                }
            }
        })
        .on('end', (error) => {
            if (error) return onerror(error);

            let data;
            if (items.length) {
                data = {
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
            }

            onsuccess(data);
        });
}
let html = (url, onsuccess, onerror) => {
    const req = request({
        url: url,
        timeout: TIMEOUT
    }, (error) => {if (error) onerror(error)});

    // req
    let bufs = [], len = 0;
    req
        .on('error', onerror)
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
    // parse HTML
    let parse = (html) => {
        const rules = require('./config/match_rules.json');
        const rule = rules[url];
        if (!rule) {
            return onerror(new Error('No Matched Rule'));
        }

        const $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true,
            decodeEntities: false
        });
        const $list = $(rule['list']);
        let items = [];
        $list && $list.each(function(i, el) {
            if (i < POST_COUNT) {
                items.push({
                    title:  $(this).find(rule['item_title']).text() || '',
                    link: $(this).find(rule['item_link']).attr('href') || '',
                    date: $(this).find(rule['item_date']).text() || '',
                    desc: $(this).find(rule['item_desc']).html() || '',
                    content: $(this).find(rule['item_content']).html() || ''
                });
            }
        });

        let data = {
            title: $('title').text(),
            items: items
        };
        onsuccess(data);
    };
};


module.exports = fetch;
