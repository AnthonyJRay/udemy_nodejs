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

