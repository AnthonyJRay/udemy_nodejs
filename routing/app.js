var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {

    if (req.url === '/') {
        fs.createReadStream(__dirname + '/index.htm').pipe(res);
    }

    else if (req.url === '/api'){ 
        res.writeHead(200, { 'Content-Type': 'application.json' });
        
        var obj = {
            firstName: 'Anthony',
            lastName: 'Eriksen'
        }; 
        res.end(JSON.stringify(obj)); // Takes the obj and converts it to a JSON string.
    }

    else{
    res.writeHead(404);
    res.end();
    }

}).listen(1337, '127.0.0.1');