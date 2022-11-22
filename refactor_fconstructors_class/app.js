'use strict';

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    greet() {
        console.log("Hello, " + this.firstName + " " + this.lastName + ".");
    }
    goodMorning() {
        console.log("Good Morning, " + this.firstName + " " + this.lastName + ".");
    }
    goodNight() {
        console.log("Goodnight, " + this.firstName + " " + this.lastName + ".");
    }
}

var anthony = new Person('Anthony', 'Eriksen');
var vincent = new Person('Vincent', 'Eriksen');
var debra   = new Person('Debra', 'Thompson');


// ability to use a method through the prototype chain on all new instantiated objects.
vincent.greet();
anthony.greet();
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~~")
vincent.goodNight();
anthony.goodNight();
console.log("~~~~~~~~~~~~~~")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
debra.goodMorning();


// can check the prototype of an object. *not widelely used

// checking if two objects share the same prototype.
console.log(anthony.__proto__ === vincent.__proto__);
console.log(debra.__proto__ === vincent.__proto__);
console.log(anthony.__proto__ === debra.__proto__);