var obj = { 
    name: 'Anthony Eriksen',
    greet: function() {
        console.log(`Hello ${this.name}`);
    }
}

obj.greet();
obj.greet.call({ name: 'Vincent Eriksen'});
obj.greet.apply({ name: 'Vincent Eriksen'})