const fs = require('fs');
const http = require('http');

const IP_FILE_NAME = 'ip-mapping.json';
let fileName;
let isXml = false;

const server = http.createServer((req, res) => {
    isXml = req.headers['content-type'] === 'application/xml' ? true : false;
    if (req.method === 'POST') {
        let rawData = '';

        req.on('data', chunk => {
            rawData += chunk;
        });

        req.on('end', () => {
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
    const ip = getUserIP(sock);
    fileName = mapIPToUserName(ip);
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server started in port 3000');
});

const getUserIP = sock => sock.remoteAddress;

const mapIPToUserName = ip => {
    const rawIp = fs.readFileSync(`${__dirname}/${IP_FILE_NAME}`);
    const ipList = JSON.parse(rawIp);
    return ipList[ip] ? ipList[ip] : ip;
}