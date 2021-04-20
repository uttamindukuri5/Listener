const fs = require('fs');
const http = require('http');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let rawData = '';
        req.on('data', chunk => {
            rawData += chunk;
        });

        req.on('end', async () => {
            const parseData = queryString.decode(rawData);
            console.log('PARSE DATA: ', parseData['<?xml version']);
            fs.writeFile(`${__dirname}/data/test-${new Date()}.xml`, `<?xml version=${ parseData['<?xml version'] }`, err => {
                if (err) {
                    throw err;
                }
                console.log('Successfully writed to file');
            } );
        })
    }

    res.end('Hello');
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server started in port 3000');
});