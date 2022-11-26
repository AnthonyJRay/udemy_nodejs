# Things JavaScript needed, that Node provides, in order to be able to manage a server.
#   - Better ways to organize code into reuseable pieces. ( Modules )
#   - Ways to deal with files.
#   - Ways to deal with databases.
#   - Ability to accept Requests and send Responses.
#   - A way to deal with work that takes a long time.

# ~~~~~~~~~

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
# The are two variables pointing at the same object in memory.
# Essentially, module.exports is passed to to the exports parameter. 

# Remember, the 'require' function RETURNS 'module.exports' so it's really returning a property on the "module" object which is a seperate variable from the "exports" variable.

# Setting a value like a function, will break the reference spot in memory.
# Changing the exports variable and assigning it a value will no longer point to the same spot in memory that 'module.exports' points to.

# The 'require' function doesn't return the 'exports' object, it returns the 'exports' property on the 'module' object. Thus resulting in 'module.exports' to not inherit the function assigned to the 'exports' property.

# exports CAN be mutated, or properties and methods ADDED to it as long as it isn't being ASSIGNED a new value. Thus module.exports will continue to inherit those properties and methods as 'modules' will still remain pointing to that same object.

# Given the potentially proplematic behavior that can happen if 'exports' gets assigned a new xvalue, even if, some code out there might use the 'exports' object to add or mutate new properties and methods...

# JUST USE 'module.exports' !!!!

## ES6 MODULES SYNTAX

```
export function greet() {
    console.log("Hello");
}

import * as greetr from 'greet';
greetr.greet();

```

# * will import anything that has the export keyword. * is not required and can be more specific to import certain things.

# ~~~~~~~~~

# EVENTS AND THE EVENT EMITTER

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

# ~~~~~~~~~

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
    }1
}

obj.greet();
obj.greet.call({ name: 'Vincent Eriksen'}, params, params)
obj.greet.apply({ name: 'Vincent Eriksen'}, [params,params])

```

# .call() takes a comma seperated list whereas .apply() takes an array.

# ~~~~~~~~~

# ES6 CLASSES

# "Classes" introduced in ES6 are a new way to create objects. Although, under the hood, they are created the same way. It's just an easier way to type them or "Syntactic Sugar".


# 'use strict' at a JavaScript file forces more rules to how you can write your code. First instance, you can't create a variable and set a value to it on the fly without declaring the variable first with var, let, or const.


# Example of difference between syntax, fconstructor vs classes.

# Function Constructor syntax
```
function Person(firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;
}
Person.prototype.greet = function() {
    console.log("This method is added to the prototype chain".)
}
var person1 = new Person("Anthony", "Eriksen")

```
# Manually adding things to the prototype using Constructor Function syntax.

# Class syntax

```
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    greet() {
        console.log("This method is added to the prototype chain.")
    }
}

var person2 = new Person("Vincent", "Eriksen");

```
# Anything inside the class and outside the constructor is automatically added to the prototype. Anything inside the constructor is added to each new object instantiated.


# It's important to understand how Classes are structured under the hood. Classes in other programming languages are very difference than Classes in JavaScript. In JavaScript, Classes are just syntactic sugar and it abstracts you away from understanding the structure of the prototype chain and how it operates.

# Classes are easier to write and cleaner. It's nice syntax but you need to understand what's actually happening under the hood.

# "extends" replaces inherit.
# "super();" is require in the constructor() {}. Replaces .call();

# JavaScript is "Synchronous"!
#   "One process executing at a time."
# Node does things "asynchronously".
#   "Multiple processes executing at once."
# V8 is Synchronous!

# CALLBACKS

# A callback is a function passed to some other function which we assume will be invoked at somepoint.
# The function 'calls back', invoking the function you give it when it is done doing it's work.

# ~~~~~~~~~

# BUFFERS

# Buffer: A Temporary holding spot for data. Intentially limited in size.
# Stream: A sequence of data made available over time. Pieces of data that eventually combine into whole.

# A stream, is a continuous flow a data, like water in a river. As data comes down the stream, it gets caught by the buffer until a certain amount of data has been captured. Then, the data is released from the buffer to be "processed" and the buffer will continue to collect the next batch of data supplied by the stream until the ALL the data has been supplied.

# Binary Data: Data stored in binary. 0's and 1's. The core of the math that computers are based on. Each one or zero is called a 'bit' or 'binary digit'.


# Character Set: A representation of characters as numbers.
# Character Encoding: How characters are stored in binary. The numbers (or code points ) are converted and stored in binary.

# THE BUFFER() METHOD IS DEPRECATED DUE TO SECURITY AND USABILITY ISSUES.

# The Buffer() method is globally available in NodeJS and does not need to be "required".

# The Buffer() method does require some data. You can specify a certain finite buffer size or directly add things like strings.

# For the second argument you can specify the encoding. e.g "utf8". Although, utf8 is the default.

```
var buf = new Buffer('Hello', 'utf8');

```

# Takes the string, or unicode character set and converts it to binary, using utf8 encoding.

# ES6 Typed Arrays

# ~~~~~~~~~

# CALLBACKS


```

function greet(callback) {
    console.log('Hello');
    var data = {
        name: "Anthony Eriksen"
    }
    callback(data);
}

greet(function() {
    console.log('The callback was invoked');
});

greet(function(data) {
    console.log('A different callback was invoked');
    console.log(data);
});

greet(function(data) {
    console.log(`Hello ${data.name}`);
});


```

# ~~~~~~~~~

# FILE SYSTEM | fs

# readFileSync(__dirname + 'fileName.txt');

# The Sync stands for synchronous. Meaning the application will wait until the operation is finished before it continues on.

# While you don't typically want things in your application to run Synchronously, it can be useful in some situations.

# Perhaps you need to read a config file first, before anything else in the application runs. readFileSync() can be useful in these situations.


# .readFile() is the "asynchronous" version. readFile takes a callback function which gets sent off to the Event Loop in core C++ libuv for the Operating System to work on WHILE the application continues to run. Once that process in the Event Loop is finished, it gets sent back to the application.

```

var greet = fs.readFile(__dirname + 'fileName.txt', function(err, data) {});

// By default, what's returned from the readFile() method is a buffer  unless you otherwise explicitly set a character encoding. i.e "uft8".

```

# Error-first Callback: Callbacks take an error object as their first parameter.
# "null" if no error, otherwise will contain an object defining the error. This is a standard so we know in what order to place our parameters for our callbacks.

# You should ALWAYS, whenever possible, do things asynchronously. It will make your applications more performant and provide a better user experience. If, for some reason a particular thing REQUIRES it to be completed before moving on, you can scope synchronous operations to that particular thing only.

# A problem with returning a buffer they go on what's called the "heap". The "heap" is the memory allocation for the V8 engine. Depending on how many people are using your application and how big the buffers are, you can cause poor performance in your application. This is why they are coupled with "Streams".

# ~~~~~~~~~

# STREAMS
# Chunk: A piece of data being sent through a stream. Data is split in 'chunks' and streamed.

# A "Stream.Readable" means you can only read the data that's coming through. You cannot send any data back down the stream.

# A "Stream.Writable" means you can only send data down the stream but you cannot read any data that's coming down the stream.

# A "Stream.Duplex" let's you do both, read and write data down the stream.

# A "Stream.Transform" let's you change the data as it comes through the stream. ie It's written to the stream and it's different when it's read.

# Abstract(base) Class: A type of constructor you never work directly with, but inherit from. We create new custom objects which inherit from the abstract base class.


# A buffer by default has a 64kb buffer size.

# The "highWaterMark: " options allows you to set a buffer size.

# ~~~~~~~~~

# PIPES

# Pipe: Connecting two streams by writing to one stream what is being read from another. In Node, you pipe from a Readable stream to a Writable stream.

# The .pipe() method is available to all readable streams through the Readable prototype.

# The pipe method takes a destination parameter. "Where do you want to send this "chunk" to?
# The destination must/should be a writable stream.


# The idea, of sending data from a readable stream to a writable stream as each chunk is processed, is very common in NodeJS development.

# .pipe() is available on a readable stream.

# The pipe() method exists on Readable streams to "pipe" data to Writable streams also Duplex and Transform streams because they include BOTH readable and writable.

# Obviously data, doesn't have to be streamed with Files. Either from a file, or too a file. Data can be streamed to ANYTHING, that is a STREAM. ie Internet Connection

# Method Chaining: A method returns an object so we can keep calling more methods. Sometimes it returns a parent object (technically "cascading") and sometimes some other object.

# Streams, Pipes, Buffers, etc. is the "NodeJS" way of thinking about data. This is how data is moved from one place to another and processed. It helps Node be performant. It provides these methodologies for these reasons.

# When working with Node you should be thinking, "Where can I use a stream?" because it minimizes the buffer size you're working with, therefore helping with how much memory your application is using and helping with the speed at which things seem to occur.

# Asynchronous methods and Streams!

# CHOOSING to NOT use a "Stream" or CHOOSING to use a "Synchronous" method, should be a deliberate and conscious decision for specific purposes.

# First instincts should ALWAYS be "Streams" and "Asynchronous".

# ~~~~~~~~~

# WEB SERVER CHECKLIST
#   - Modules (ES6 Modules)
#   - Ways to deal with Files. (fs, Streams, Pipes, Buffers)
#   - A way to deal with work that takes a long time. (Asynchronous, Streams, Chunks, Event Loop)

# ~~~~~~~~


# HTTP and Being a Web Sever


# TCP/IP PROTOCOL

# Protocol: A set of rules two sides agree on to use when communicating.
#   -Both the client and server are programmed to understand and use that particular set of rules.

# Port: Once a computer receives a packet, how it knows what program to send it to.
#   - When a program is setup on the operating system to receive packets from a particular port, it is  said that the program is 'listening' to that port.

# If a client, makes a request to a web server, the web server could be running multiple programs. eg NodeJS, Email, FTP, etc. You use ports to give these programs a unique identifier which allow you to control which program your request should be looking to send to and for each server program to know for which port to be listening for.

# The port is specified as part of the IP Address.

# Socket Address
# 78.132.160.4:443
# IP Address:Port


# HTTP

# HTTP: A set of rules(or format) for data being transferred on the web.
# - "HyperText Transfer Protocol". It's a format defining data being transferred via TCP/IP.
# The FORMAT of the Request and Reponses is in "HTTP".


# HTTP Request example

# CONNECT www.google.com:443 HTTP/1.1
# HOST: www.google.com
# Connection: keep-alive

# ~~~~~~~~~~

# HTTP Response example

# (status) HTTP/1.1 200 OK           
# (headers) Content-Length: 44
# (headers) Content-Type: text/html <-- MIME Type

# (body) <html><head>...</head></html>



# MIME type: A standard for specifying the type of data being sent.
#   Stands for "Multipurpose Internet Mail Extensions'.
# eg application/json, text/html, image/jpeg


# HTTP_PARSER ( Found inside core NodeJS )
# Parses data in Requests and Responses into packets/chunks.

# ~~~~~~~~~~~~~~~~

# Build a Web Server in Node

# http is a core NodeJS module.
# http has a .createServer() method for setting up a local server.
# .createServer takes in a callback function as a parameter which is turned into an event listener from the core Event Emitter object..
# The callback function takes in a request and response parameter to set up how to deal with requests and reponses.
# the response object has access to a .writeHead() method where you can create your headers.
# The .writeHead() method takes in a status code and options wrapped in object literals which specify things like the content type. (html/text/files/etc)
# Below the headers you write in the body of the request/reponse itself.
# Then the req/res objects have access to a .send() or .end() method;
# The createServer() method also has access to a .listen() method where you specify which port to listen on and an address.


# Template: Text designed to be the basis for final text or content after being processed.There's usually some specific template language, so the template system knows how to replace placeholders with real values.


# .replace() can be used to dynamically insert HTML markup.


# API and Endpoints

# API: A set of tools for building a software application. The tools are usually made available via a set of URLs which accept and send only data via HTTP and TCP/IP.

# Endpoints: One URL in a web API. Somethings that endpoint does multiple things by making choices based on the HTTP request headers.


```

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'application.json' });
   var obj = {
    firstName: 'Anthony',
    lastName: 'Eriksen'
   }
   res.end(JSON.stringify(obj)); // Takes the obj and converts it to a JSON string.

}).listen(1337, '127.0.0.1');


Output: {"firstName":"Anthony","lastName":"Eriksen"}

```

# Serialize: Translating an object into a format that can be stored or transferred. JSON, CSV, XML, and others are popular. 'Deserialize" is the opposite.


# ROUTING
# Routing: Mapping a HTTP requests content. Whether actual files exist on the server or not.



# ~~~~~~~~~

# WEB SERVER CHECKLIST
#   - Modules (ES6 Modules)
#   - Ways to deal with Files. (fs, Streams, Pipes, Buffers)
#   - A way to deal with work that takes a long time. (Asynchronous, Streams, Chunks, Event Loop)
#   - The ability to accept requests and send responses. ( http object, createServer(), req/res)

# ~~~~~~~~


# NPM: Node Package Manager
 

 # Versioning
 # v1.7.3 = vMajor.Minor.Patch
 # semver.org

# NPM and NPM Registry


# Init, Nodemon, Package.JSON

# "npm init" to initialize a package.json in your application.

# "scripts" inside the package.json is where you can add additional commands ie testing, starting server, etc.
# "npm test" comes by default.


# npm install <package>
# "  --save " ( creates a reference in the package.json under dependencies )
# If a dependency has a "Carot" (" ^ ") in it's version number, it means it will automatically update that dependency if it's a "Minor" or "Patch" update.
# A "Tilde" (~) means it will only update on patches.
# You don't need to push the "node_modules" folder to Github. Keeps your application size smaller. Use "npm install" to install listed dependencies in the "package.json" file.

# " --save-dev " saves the package as "Development Dependency". Meaning, the app will still run without it but it's required to have when working on the development. ie testing tools, etc.

# -g Will install the package globally on  your machine. Where in your computer it installs can vary.

# One critisism of Node is that every dependency comes with its own set on dependencies and may end up with duplicate dependencies in the same application. This is why it's important to push only what the application needs to run.


# nodemon ( Node Monitor ) watches for changes in your Node application and updates it live without having to restart or re-run your code.

# nodemon <filename> By default it looks for app.js

# Nodemon uses the built-in 'fs' module functionality within Node.


# Express

```

var express = require('express');
var app = express();

app.listen(3000);

```


# Environment Variables: Global variables specific to the environment (server) the code is living in. Different servers can have different variable settings and we can access those values in code.

```
var port = process.env.PORT || 3000;
```

# Setting up a variable for the .listen() method to use either the current environments port and if there isn't one, use port 3000.

# You must set up an environment variable. Could have different ports set up for different reasons. aka port 80 for production.

# Setting up environment variables is very common for this kind of application.

# HTTP Method: Specifies the type of action the request wishes to make. GET, POST, DELETE, and others. Also called "verbs".

# the ".get()" method that is returned from the "express()" function is the same/similar to the HTTP GET request but more powerful and with a few more features.

```

app.get('/', function(req, res) {
    res.send('
    <html>
        <head></head>
            <body>
                <h1>Hello World</h1>
            </body>
    </html>')
});

```

# Notice the .send() method is sending a string. A string of HTML. Also note how there is no need to specify it's content type, as express will do that for you.

```
app.get('/api', function(req, res) {
    res.json({ firstName: "Anthony", lastName: "Eriksen"})
})
```

# Express also has a .json() method to handle JSON data. Removing the need to set the content-type to application/json manually in the headers.

# ~~~~~~~

# Routing

# Visit "expressjs.com" to find further documentation on "Express" and "Routing".
# You can find ways to match route paths based on string patterns.

```

app.get('/person/:id', function(req, res) {
    res.send('
    <html>
        <head></head>
            <body>
                <h1>Person: ' + req.params.id + '</h1>
            </body>
    </html>')
});

```

# In the path, ":id" is a variable and that variables contents will be read, and sent into the request objects "params" property.

# This is very useful to be able to use variables to pull data dynamically and use that data in your application based on it's url.

# ~~~~~~~~~~~~~~~~~~~~

# Static Files and Middleware
# Middleware: Code that sits between two layers of software.
#   In the case of Express, sitting between the request and the response.

# Middleware is where you put common plugins or things that should happen between the request and response.

# A common example of middleware is being able to handle files being downloaded. ie CSS files, Image files, etc.

# Static Files: Files not processed by code in any way. ie HTML, CSS, Image files.

# It is very common to name the file that holds your static files "public".

```
app.use('<route>', express.static(__dirname + '<static folder>'));
```

# Middleware is inserting with the .use() method returned from the express() object.
# The method takes in a url, or a route, that the request will come from and the second parameter is where or what is being used/looked for and "stream" it back.
# So anything in the folder specified in the .static() method, will become available when visiting/requesting from the route.
# Can be used to reference/access data through routes you request in your app for specific purposes not just client-side requests.

# You can make your own middleware with the .use() method. Just remember in the callback function, it takes a req, res, and a third, next parameter. You call "next()" to exit the function and go on to the "next" thing. Or, just exit the function.

# next() can allow for chaining middleware if needed.

# You can also leave off the route in the use() method to make the middleware run on every request.

# You can find some popular middleware plugins on the Expressjs website with guides on how to implement and use them. eg Parsing cookies, session cookies, debuggers, body parser, etc.

# A very popular middle is called "passport" which deals with authentication. Which makes sure a user is properly logged in and authenticated before you actually response with any data or personal information. Be it logged in through the application itself, or OAUTH (logging in through Google or Facebook, etc).


# ~~~~~~~~~~~~~~~~~~~

# Templates and Template Engines











