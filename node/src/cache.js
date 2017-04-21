// cache util

const redis = require('redis');

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
    .on('ready', function(res) {
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
    },
    get: (url, callback) => {
        //! get do NOT queue
        if (!client || !ready) {
            process.nextTick(callback);
            return;
        }
        client.get(url, (json) => {
            let data;
            try {
                data = JSON.parse(json);
            } catch(ex) {
                return console.error(ex.message);
            }
            callback(data);
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
