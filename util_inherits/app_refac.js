'use strict';

var Greetr = require('./greetr_refac')

var greeter1 = new Greetr();

greeter1.on('greet', function(data) {
    console.log('Someone greeted!: ' + data);
})

greeter1.greet('Anthony');