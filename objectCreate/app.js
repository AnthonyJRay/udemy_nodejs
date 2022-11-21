var person = {
    firstname: '',
    lastname: '',
    greet: function() {
        return this.firstname + ' ' + this.lastname;
    }
}

var anthony = Object.create(person);
anthony.firstname = "Anthony";
anthony.lastname = "Eriksen";

var vincent = Object.create(person);
vincent.firstname = "Vincent";
vincent.lastname = "Eriksen";

console.log(anthony.greet());
console.log(vincent.greet());