// Immediately Invoked Function Expressions (IIFE)
// Variables created within a function are "scoped" to that function and are not accesible outside that function.
// Wrapping code in parens and immediately calling it prevents all the code within that expression to be scoped,
// protected from interhering with other parts of the codebase. Important aspect of modules.
var firstName = "Vincent";

(function (lastName)  {

    var firstName = "Anthony"
    console.log(firstName);
    console.log(lastName);

}("Eriksen"));

console.log(firstName);