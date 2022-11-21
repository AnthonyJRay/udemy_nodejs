var person = {
    firstName: 'Anthony',
    lastName: 'Eriksen',
    greet: function() {
        console.log('Hello, ' + this.firstName + ' ' + this.lastName + '.');
    }
}

person.greet();

// bracket notation can be useful for dynamically deciding properties names.
console.log(person['firstName']);