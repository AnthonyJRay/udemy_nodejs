var bodyParser = require('body-parser');

module.exports = function(app) {

    app.post('/api/person/:id', function(req, res) {
        // get from database
        res.json({ firstName: "Anthony", lastName: "Eriksen"})
    })
    
    
    app.post('/api/person', function(req,res) {
        // save to the database
    
    });
    
    app.delete('/api/person/:id', function(req, res,) {
        // delete from the database
        
    });
}