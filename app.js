var fs = require('fs');
var zlib = require('zlib');

var readable = fs.createReadStream(__dirname + '/hello.txt');

var writable = fs.createWriteStream(__dirname + '/helloCopy.txt');

var compressed = fs.createWriteStream(__dirname + '/hello.txt.gz');

var gzip = zlib.createGzip();
// This creates a "Transform" stream. It's both "Readable" and "Writable". 
// Everytime a "chunk" is sent to it, it compresses that chunk.
// Since it is both Readable and Writable, it can be piped to another writable stream.


// readable.on('data', function(chunk) {
//     console.log(chunk);
//     writable.write(chunk);
// })

readable.pipe(writable); 
// The .pipe() method essentially is setting up the same functionality as the code above.

readable.pipe(gzip).pipe(compressed);
// Piping a "Readable" stream, into a "Transform" stream, which is then piped into a "Writable" stream.

// ~~ Following the Logic ~~
// It will read from '/hello.txt', a Readable stream.
// "Pipe" it over to "gzip", a "Transform" stream. Which is both, "readable" and "writable".
// Compress each chunk as they are processeed through the buffer.
// Since gzip is both Readable and Writable, we can then pipe what's returned from 'gzip' (the compressed chunk), to a "Writable" stream. In this case, "/helloCopy.txt".