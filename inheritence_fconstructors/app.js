function Person(firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;
}

// adding properties and methods to the prototype allows all instatiated objects to have access to them. 
// the prototype property is "not" the prototype of "Person", it's the prototype of any objects "created" from Person.
Person.prototype.greet = function() {
    console.log("Hello, " + this.firstName + " " + this.lastName + "."); // each time an object is instantiated through a constructor using the "new" keyword, ths "this" keyword is automatically pointed to a new object.
}

Person.prototype.goodMorning = function() {
    console.log("Good Morning, " + this.firstName + " " + this.lastName + ".");
}
Person.prototype.goodNight = function() {
    console.log("Goodnight, " + this.firstName + " " + this.lastName + ".");
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
console.log(anthony.__proto__);
console.log(vincent.__proto__);

// checking if two objects share the same prototype.
console.log(anthony.__proto__ === vincent.__proto__);