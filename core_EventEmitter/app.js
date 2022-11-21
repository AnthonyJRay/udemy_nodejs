var Emitter = require('events');
var eventConfig = require('./config').events;

var emtr = new Emitter();

emtr.on(eventConfig.GREET, function() {
    console.log('Somewhere, someone said hello.');   // Remember, the .on() method will look for 'greet' as a PROPERTY NAME of the Emitter object.
});

emtr.on(eventConfig.GREET, function() {
    console.log('A greeting occurred!');
});

console.log('Hello!');      // Hypothetical event occured
emtr.emit(eventConfig.GREET);         // Manually calling the emit() function to simulate an event trigger.
