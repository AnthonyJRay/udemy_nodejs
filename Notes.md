# Things JavaScript needed, that Node provides, in order to be able to manage a server.
#   - Better ways to organize code into reuseable pieces. ( Modules )
#   - Ways to deal with files.
#   - Ways to deal with databases.
#   - Ability to accept Requests and send Responses.
#   - A way to deal with work that takes a long time.




# MODULES 

# Each folder represents notes from various segments of the course.
# Depending on what's being demonstrated in each segment, you should note to need to move either the 'app.js' file into the ROOT directory or all files within a segment folder. 
# This just makes it easier than to have to move in and out of a directory in the CLI.

# NOTE: Simply returning an object from require will be cached and any subsequent call to that file will point to the same cached object. ie Changes to properties will affect all objects.


# When code is ran through node, it's ran through a 'function expression'.
# Which is how we get access to the "module" object. It's a parameter passed to the function.
```
    (function(exports, require, module, __filename, __dirname) {
        var greet = function() {
            console.log("Hello");
        };

        module.exports = greet;
    });

fn(module.exports, require, module, filename, dirname);
```

# Essentially, module.exports is passed to to the exports parameter. 
# The are two variables pointing at the same object in memory.
# Remember, the 'require' function RETURNS 'module.exports' so it's really returning a property on the "module" object which is a seperate variable from the "exports" variable.

# Setting a value like a function, will break the reference spot in memory.
# Changing the exports variable and assigning it a value will no longer point to the same spot in memory that 'module.exports' points to.
# The 'require' function doesn't return the 'exports' object, it returns the 'exports' property on the 'module' object. Thus resulting in 'module.exports' to not inherit the function assigned to the 'exports' property.

# exports CAN be mutated, or properties and methods ADDED to it as long as it isn't being ASSIGNED a new value. Thus module.exports will continue to inherit those properties and methods as 'modules' will still remain pointing to that same object.

# Given the potentially proplematic behavior that can happen if 'exports' gets assigned a new value, even if, some code out there might use the 'exports' object to add or mutate new properties and methods...

# JUST USE 'module.exports' !!!!


## ES6 Modules Syntax

```
export function greet() {
    console.log("Hello");
}

import * as greetr from 'greet';
greetr.greet();

```

# * will import anything that has the export keyword. * is not required and can be more specific to import certain things.



# Events and the Event Emitter

# In Node there are two seperate kinds of Events. "System Events" || "Custom Events"
# "System Events" come from the C++ core in "libuv". Such as file system events.
# "Custom Events" come from the JavaScript core. These events are not part of the C++ core "libuv", these are part of the "Event Emitter" inside the JavaScript core.

# "So the Event Emitter in Node is where we have custom events and that's JavaScript."
# "libuv is sending events that are happening inside the computer system. Lower level, closer to the machine."

# Since in many cases JavaScript code is "wrapping" C++ code, system events in libuv often times generate custom JavaScript events to make it easier to manage events/code.

# Note to remember, they are NOT the same thing.

# Throughout your application you could have many listeners, listening for a single event.

# The Event Emitter is really just an Object, full of arrays of functions.

# WORD WORD ALERT
# "Magic String: A string that has some special meaning in our code."
# This is bad because it makes it easy for a type to cause a bug and hard for tools to help us find it.

# A common pattern to avoid the use of "magic strings" is to create a seperate config file that has an object which stores the string as a value to a property. Resulting in the objects property being based around instead of a raw string. Eliminating the risk for typos and bugs. Which can be highly problematic in large codebases.
# You can store as many of these "event variables" or names as needed, and reference them all from the same object.

# RECAP: There are several ways to setup the prototype chain.
#   - Function Constructors
#   - ES6 Class ('extends' keyword sets up the prototype chain.)
#   - Object.create()

# Object.create() will create a new empty object, with it's prototype pointing an object passed into the parameters of Object.create.().
# This is a very simple and clean way to setup a prototype chain/inheritence.


```
var person = {          
    FIRSTNAME: '',
    LASTNAME: '',
    greet: function() {
        console.log("Hello " + this.FIRSTNAME + " " + this.LASTNAME);
    }
}

var john = Object.create(person);
john.FIRSTNAME = "John";
john.LASTNAME = "Doe";

var jane = Object.create(person);
jane.FIRSTNAME = "Jane";
jane.LASTNAME = "Doe";

console.log(john.greet());
    ( Output: "Hello John Doe" )
console.log(jane.greet());
    ( Output: "Hello Jane Doe" )

```

# The person object will be used as the prototype for which any objects created pointing to it will inherit it's properties and methods through the prototype chain.
# Creates a new empty object "john" and points to "person" to inherit it's prototype.
# Stores the string value "John" in the empty objects FIRSTNAME property, on it's prototype.

# Template literals example

```
var firstName = "Anthony";
console.log("Hello " + firstName);
console.log(`Hello ${firstName}`);

```


# .call() and .apply()

# .call() will take in an object for the "this" keyword to point to.

```

var obj = { 
    name: 'Anthony Eriksen',
    greet: function() {
        console.log(`Hello ${this.name}`);
    }
}

obj.greet();
obj.greet.call({ name: 'Vincent Eriksen'})
obj.greet.apply({ name: 'Vincent Eriksen'})

```

# Here, instead of the "this" keyword pointing to "obj" it instead points to the object passed into the .call() method. Essentially borrowing the functionality of obj.greet(); and giving it it's own object context.

# .apply() works in the exact same way as .call(), the only difference being how parameters are passed if there are any.

```

var obj = { 
    name: 'Anthony Eriksen',
    greet: function(params) {
        console.log(`Hello ${this.name}`);
    }
}

obj.greet();
obj.greet.call({ name: 'Vincent Eriksen'}, params, params)
obj.greet.apply({ name: 'Vincent Eriksen'}, [params,params])

```

# .call() takes a comma seperated list whereas .apply() takes an array.