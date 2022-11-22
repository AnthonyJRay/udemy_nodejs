var buf = new Buffer('Hello', 'utf8');
// THE BUFFER() METHOD IS DEPRECATED

console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());
console.log(buf[2]);

buf.write('wo');
// You typically don't ever have to directly change what's in the buffer.
console.log(buf.toString());