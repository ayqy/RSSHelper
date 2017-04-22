// schedule to cache data

const schedule = require('node-schedule');

const cacheService = require('./cache/cache_service.js');

let job;
module.exports = {
    start: () => {
        // every 2 hours
        job = schedule.scheduleJob('* */2 * * *', function() {
            console.log('schedule job triggered');
            cacheService.run();
        });
    },
    cancel: () => {
        job.cancel();
    }
};
