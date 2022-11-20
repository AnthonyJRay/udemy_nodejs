// creating a function on the fly assigned to the export object
var greet = require('./greet1');
greet();

// Reaching down into the object and grabbing a specific property with the require function will also assign the variable a function instead of the export object.
var greet2 = require('./greet2').greet;
greet2();

var greet3 = require('./greet3');
greet3.greet();
greet3.greeting = "Changed hello world";

var greet3b = require('./greet3');
greet3b.greet();
// the greet3b method will return the same greeting as the greet3 method. Being that objects are by reference, each will be pointing to the same spot in memory.
// each time the require method is called, it "caches" that objects properties and if that same path is required again, anywhere within the application instead of inheriting the origin object properties, it will instead point to the same place in memory that had the property change.

var greet3 = require('./greet3');
greet3.greet();

var Greet4 = require('./greet4');
var grtr = new Greet4();
grtr.greet();
// passing the constructor function up through the require function and instantiating new objects without calling the require function will preserve the original functions properties and methods throughout new instantiated objects.

var greet5 = require('./greet5').greet;
greet5();