// cache util

const redis = require('redis');

// 2 hours
const EXPIRE = 2 * 60 * 60;

const PORT = 6379;
const HOST = '127.0.0.1';
const PWD = 'jiajiejie';
const OPTS = {auth_pass: PWD};

// connect redis
let client = redis.createClient(PORT, HOST, OPTS);
let ready = false;
client
    .on('error', (error) => {
        ready = true;
        client = false;
        cache.clearQueue();
        console.error('REDIS CONNECTION FAILED');
        console.error(error.message);
    })
    .on('ready', (res) => {
        ready = true;
        cache.clearQueue();
        console.info('redis connected');
    })

// cache util
let cache = {
    queue: [],
    set: (url, data, callback) => {
        // store is not available
        if (!client) {
            process.nextTick(callback);
            return;
        };
        if (!ready) cache.queue.push(() => {
            client.set(url, data, callback);
        });
        try {
            data = JSON.stringify(data);
        } catch(ex) {
            return console.error(ex.message);
        }
        client.set(url, data, callback);
        cache.expire(url);
    },
    get: (url, callback) => {
        //! get do NOT queue
        if (!client || !ready) {
            process.nextTick(callback);
            return;
        }
        client.get(url, (error, json) => {
            if (error) {
                process.nextTick(callback);
                return;
            }
            let data;
            try {
                data = JSON.parse(json);
            } catch(ex) {
                return console.error(ex.message);
            }
            callback(data);
        });
    },
    expire: (url, expire) => {
        client.expire(url, expire || EXPIRE);
    },
    ttl: (url, callback) => {
        client.expire(url, (error, ttl) => {
            if (error) ttl = 0;
            callback(ttl);
        });
    },
    checkFresh: (url, callback) => {
        cache.ttl(url, (ttl) => {
            callback(ttl > EXPIRE / 2);
        });
    },
    clearQueue: () => {
        if (!cache.queue.length) return;
        if (client) {
            let q = cache.queue.slice();
            cache.queue = [];
            q.forEach((op) => {
                op();
            });
        }
        else {
            cache.queue = [];
            console.error('redis client does not exists');
        }
    }
};

module.exports = cache;
