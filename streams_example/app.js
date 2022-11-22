var fs = require('fs');

var readable = fs.createReadStream(__dirname + '/greet.txt', { encoding: 'utf8', highWaterMark: 1024});

var writable = fs.createWriteStream(__dirname + '/greetCopy.txt');

readable.on('data', function(chunk)  {
    console.log(chunk.length);
    writable.write(chunk)
});

// As data fills up the buffer from 'greet.txt', it emits an event once full and triggers the callback function in the .on() method.

// Must add options in the createReadStream() parameters via an object. Without the encoding option being set, console.log() will return the unicode character codes instead of the actually string text.

// The "highWaterMark" options allows you to set a buffer size.


// The current greet.txt file is roughly 3188 bytes. Setting the buffer to 1024 bytes, it will send out data "chucks" each time it fills 1024 bytes.
// This results in the buffer sending 4 chunks. 1024, 1024, 1024, 116.