// Creating a function on the fly will make "exports" return a function instead of an object.
module.exports = function() {
    console.log("Hello World");
}
