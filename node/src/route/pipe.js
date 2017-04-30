// route /pipe
const http = require('http');
const url = require('url');


let fetchImage = function(sUrl, onsuccess, method, onerror) {
    const urlData = url.parse(sUrl);
    const options = {
        port: urlData.port || 80,
        host: urlData.host || 'localhost',
        method: method || 'GET',
        path: urlData.path || '/'
    };

    request = http.request(options);
    request.end();

    request
        .on('response', function(response) {
            const type = response.headers["content-type"];
            let body = '';

            response.setEncoding('binary');
            response.on('end', function() {
                let data = {
                    type: type,
                    body: body
                };
                typeof onsuccess === 'function' && onsuccess(data);
            });
            response.on('data', function(chunk) {
                body += chunk;
            });
        })
        .on('error', onerror);
};


module.exports = (ctx, next) => {
    // native req, res
    const req = ctx.req;
    const res = ctx.res;

    const params = url.parse(req.url, true);
    const sUrl = params.query.url;
    if (!sUrl) {
        res.writeHead(404, {'Context-Type': 'text/plain'})
        res.end('url required');
        return;
    }

    await new Promise((resolve, reject) => {
        const url = ctx.params.url;

        let onsuccess = (data = {}) => {
            res.writeHead(200, {"Content-Type": data.type});
            res.write(data.body, "binary");
            res.end();
            resolve();
        };
        let onerror = reject;
        fetchImage(sUrl, onsuccess, 'GET', onerror);
    });
};
