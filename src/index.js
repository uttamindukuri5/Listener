const fs = require('fs');
const http = require('http');
const queryString = require('querystring');

const IP_FILE_NAME = 'ip-mapping.json';
let fileName;
let isXml = false;

const server = http.createServer(async (req, res) => {
    isXml = req.headers['content-type'] === 'application/xml' ? true : false;
    if (req.method === 'POST') {
        let rawData = '';

        req.on('data', chunk => {
            rawData += chunk;
        });

        req.on('end', async () => {
            const data = rawData;
            fs.writeFile(`${__dirname}/data/${fileName}-${new Date()}.${isXml ? 'xml' : 'json'}`, data, err => {
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