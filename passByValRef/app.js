// Pass by Value
// Passing primitive values creates a copy of the new value and points to a difference spot in memory. 
// leaving the original value unchanged.
function change(b) {
    b = 2;
}
var a = 1;
change(a);
console.log(a);

// Pass by Reference
// Passing non-primitive values/objects points to the same location in memory. 
// so, changing a value in that location changes the value for all instances pointing to that location outside the function.
function changeObject(d) {
    d.prop1 = function () {};
    d.prop2 = {};
}

var c = {};
c.prop1 = {};
changeObject(c);
console.log(c);