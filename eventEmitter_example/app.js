var Emitter = require('./emitter');  // Change this to simply 'emitter' or 'events' which is the NodeJS folder the EventEmitter exists it.
                                    // Simply changing this to the core NodeJS emitter will continue to run this code the same as if you were using the trivial emitter created in emitter.js
var emtr = new Emitter();

emtr.on('greet', function() {
    console.log('Somewhere, someone said hello.');   // Remember, the .on() method will look for 'greet' as a PROPERTY NAME of the Emitter object.
});

emtr.on('greet', function() {
    console.log('A greeting occurred!');
});

console.log('Hello!');      // Hypothetical event occured
emtr.emit('greet');         // Manually calling the emit() function to simulate an event trigger.
