var express = require('express');
var app = express();

var htmlController = require('./controllers/htmlController')
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function(req, res, next) {
    console.log('Request URL: ' + req.url);
    next();
})

htmlController(app);
apiController(app);

app.listen(port); 