const fs = require('fs');
const http = require('http');
const queryString = require('querystring');

const IP_FILE_NAME = 'ip-mapping.json';
let fileName;

const server = http.createServer(async (req, res) => {

    if (req.method === 'POST') {
        let rawData = '';

        req.on('data', chunk => {
            rawData += chunk;
        });

        req.on('end', async () => {
            const parseData = queryString.decode(rawData);
            console.log('PARSE DATA: ', parseData['<?xml version']);
            fs.writeFile(`${__dirname}/data/${fileName}-${new Date()}.xml`, `<?xml version=${ parseData['<?xml version'] }`, err => {
                if (err) {
                    throw err;
                }
                console.log('Successfully writed to file');
            } );
        })
    }

    res.end('Hello');
});

server.on('connection', sock => {
    const rawIp = fs.readFileSync(`${__dirname}/${IP_FILE_NAME}`);
    const ipList = JSON.parse(rawIp);
    console.log(ipList);
    const ip = sock.remoteAddress;
    if (ipList[ip]) {
        fileName = ipList[ip];
    } else {
        fileName = ip;
    }
    console.log('SOCK: ', sock.remoteAddress);

});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server started in port 3000');
});