var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

var port = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function(req, res, next) {
    console.log('Request URL: ' + req.url);
    next();
})

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/person/:id', function(req, res) {
    res.render('person', { ID: req.params.id, Qstr: req.query.qstr })
});

app.post('/person',urlencodedParser, function(req, res) {

        res.send('Thank you!');
        console.log(req.body.firstName);
        console.log(req.body.lastName);
});

app.post('/api/person/:id', function(req, res) {
    res.json({ firstName: "Anthony", lastName: "Eriksen"})
})


app.post('/api/person', jsonParser, function(req,res) {
    // save to the database

});

app.delete('/api/person/:id', function(req, res,) {
    // delete from the database
    
});
app.listen(port); 