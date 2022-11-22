var util = require('util');

function Person() {
    this.firstName = "Anthony",
    this.lastName = "Eriksen"
}
// "this" refers to the object created from "Person"

Person.prototype.greet = function() {
    console.log(`Hello ${this.firstName} ${this.lastName} Badge Number: ${this.badgeNumber}`);
}
// Since we are interacting with "Person", "this.firstName" will point to the firstName property of "Person".

// New Function Constructor
function Policeman() {
    Person.call(this);          // Neccessary to get our Policeman object access to Person directly. Outside of the prototype chain.
    this.badgeNumber = '1234';
}

util.inherits(Policeman, Person);
var officer = new Policeman();
// when a new object is created from "Policeman", it sets up it's own "this" keyword.
officer.greet();
// Because "greet()" is on the "Person" prototype, and we "inherited" Person into Policeman from which officer was created, we have access to that method.
// However, we do not have access to the firstName and lastName values inside of the Person object. 
// When officer runs greet(), it's going to look at the "Policeman" object for a firstName and lastName since that's what "this" is pointing to.

// This is where .call() or .apply() come into place.
// Person.call(this) is saying, invoke the Person function, with our Policeman "this" and point it to Person.
// So when when try to access this.firstName through the new Policeman object, it will have access to those properties and methods.

// the "officer" object will have access to "Person" PROTOTYPE but it doesn't inherit the "Person" objects direct properties and methods.
// .call() and/or .apply() can fix this. These are neccessary to setup the inheritence chain in both directions between the actual properties and methods and the prototypes of the objects.
// This funtionality is achieved by changing where the "this" keyword is pointing and what objects are sharing "this".
