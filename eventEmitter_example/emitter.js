const greetModule = require("./greetModule");

function Emitter() {
    this.events = {};
}

Emitter.prototype.on = function(type, listener) {
    this.events[type] = this.events[type] || [];    // Checks if the property already exists. If not, create an empty array.
    this.events[type].push(listener);               // Push "listener" into the property array.
}

Emitter.prototype.emit = function(type) {
    if (this.events[type]) {                                // Check if the event type is a property on the "events" object.
        this.events[type].forEach(function(listener) {      // If the property exists, loop through the array.
            listener();                                     // Executes each method within the "type" array on the Event object.
        });
    }
}

module.exports = Emitter;