// 'Revealing' module pattern
// exposing only the properties and methods you want via an returned object.
// very common and clean way to structure and protect code within modules.

var greeting = "Hi world";

function greet() {
    console.log(greeting)
}

module.exports = {
    greet: greet
}

// the greet property will contain what is "returned" from the greet function. "module.exports" or the "greet" property will not be able to access the greeting variable as it is outside of the "greet" properties scope.

