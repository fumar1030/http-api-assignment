const http = require('http');
const htmlHandler = require('./htmlResponses');
const cssHandler = require('./cssResponses');

var port = process.env.port || process.getActiveResourcesInfo.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);

    switch(request.url){
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        default:
            htmlHandler.getIndex(request, response);
            break;
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
})