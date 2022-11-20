// creating a function on the fly assigned to the export object
var greet = require('./greet1');
greet();

// Reaching down into the object and grabbing a specific property with the require function will also assign the variable a function instead of the export object.
var greet2 = require('./greet2').greet;
greet2();


var greet3 = require('./greet3');
greet3.greet();