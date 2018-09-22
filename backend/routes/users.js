var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
});

var User = mongoose.model('User', UserSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}).exec(function(err, result) {
        if(!err) {
            var string = JSON.stringify(result, undefined, 2);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(string);
        } else {
            res.writeHead(500, {'Content-Type': 'text/html'})
            res.end('Error while loading User')
        }
    });
});

router.post('/', function(req, res) {
    var firstname = req.body.firstname || '';
    var lastname = req.body.lastname || '';
    var age = req.body.age || null;

    var newUser = new User({
        firstname: firstname,
        lastname: lastname,
        age: age
    })

    newUser.save(function(err) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end("Error while saving");
        }
    })
    res.writeHead(200, {'Conntent-Type': 'text/html'});
    res.end('User successfully saved')
});

router.delete('/', function(req, res){
    User.remove({}, function(err) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end("<h2>Error</h2><div>error while deleting all user data in database.</div>");
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end("<h2>Done</h2><div>all data cleared for model <emph>user</emph></div>");
        }
    })
});

module.exports = router;
