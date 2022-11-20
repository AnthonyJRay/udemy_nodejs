var Emitter = require('./emitter');

var emtr = new Emitter();

emtr.on('greet', function() {
    console.log('Somewhere, someone said hello.');   // Remember, the .on() method will look for 'greet' as a PROPERTY NAME of the Emitter object.
});

emtr.on('greet', function() {
    console.log('A greeting occurred!');
});

console.log('Hello!');      // Hypothetical event occured
emtr.emit('greet');         // Manually calling the emit() function to simulate an event trigger.
