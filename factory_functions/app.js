// Factory functions are a good, safe way to make new objects.
// This factory functions leverages the advantages of closure and encapsulation with GETTERS and SETTERS to keep your variables and business-logic safe from being exposed outside their respective scopes.
// This style is also very cohesive when being able to add and keep your business logic within their respective contexts as well as from being exposed.

const createPerson = function(firstName, lastName, age) {
    // closure
    let personFirstName = firstName;
    let personLastName = lastName;
    let personAge = age;
    
    // Variables defined within a function are encapsulated by "closure" and are not accessible outside of that function.

   isValidName = function(name)  {
    return name && name.trim().length > 0;
   }

   // GETTERS and SETTERS "encapsulate" business logic and doesn't expose it outside of it's scope.
   return {
    get age() {
        return personAge;
    },

    set age(age) {
        return personAge = age
    },

    get firstName() {
        return personFirstName;
    },

    set firstName(name) {
        if(isValidName(name))  {
            personFirstName = name;
        } else {
            throw "Please provide a valid first name."
        }
    }
   }
}


const ant = createPerson("Anthony", "Eriksen", 33);
const dee = createPerson("Debra", "Thompson", 30);
console.log(ant)
console.log(ant.firstName);
