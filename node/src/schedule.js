// schedule to cache data

const schedule = require('node-schedule');
const cacheService = require('./cache_service.js');

let job;
module.exports = {
    start: () => {
        // every 2 hours
        job = schedule.scheduleJob('* */2 * * *', function() {
            cacheService.run();
        });
    },
    cancel: () => {
        job.cancel();
    }
};
