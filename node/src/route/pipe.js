// route /pipe
const http = require('http');
const url = require('url');


let fetchImage = function(sUrl, callback, method) {
    callback = callback || function() {};
    const urlData = url.parse(sUrl);
    const options = {
        port: urlData.port || 80,
        host: urlData.host || 'localhost',
        method: method || 'GET',
        path: urlData.path || '/'
    };

    request = http.request(options);
    request.end();

    request.on('response', function(response) {
        const type = response.headers["content-type"];
        let body = '';

        response.setEncoding('binary');
        response.on('end', function() {
            let data = {
                type: type,
                body: body
            };
            callback(data);
        });
        response.on('data', function(chunk) {
            body += chunk;
        });
    });
};


module.exports = (ctx, next) => {
    // native req, res
    const req = ctx.req;
    const res = ctx.res;

    var params = url.parse(req.url, true);
    var sUrl = params.query.url;
    if (!sUrl) {
        res.writeHead(404, {'Context-Type': 'text/plain'})
        res.end('url required');
        return;
    }

    fetchImage(sUrl, function(data) {
        res.writeHead(200, {"Content-Type": data.type});
        res.write(data.body, "binary");
        res.end();
    });
};
