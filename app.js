var fs = require('fs');

var readable = fs.createReadyStream(
    __dirname + '/hello.txt',
    { encoding: 'utf8', highWaterMark: 1024}
    );

var writable = fs.createWriteStream(__dirname + 'helloCopy.txt');

readable.on('data', function(chunk) {
    console.log(chunk);
    writable.write(chunk);
})