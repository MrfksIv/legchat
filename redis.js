const redis = require('redis');

const HOST = '127.0.0.1', PORT = 6379;

const client = redis.createClient(PORT, HOST);

client.on('connect', () => {
    console.log('redis client connected...');
});
client.on('error', (err) => {
    console.log('ERROR:', err);
});