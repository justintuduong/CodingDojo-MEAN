var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// Use native promises (only necessary with mongoose versions <= 4)
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// Routes
// Root Request
app.get('/', (req, res) => {
	// This is where we will retrieve the users from the database and include them in the view page we will be rendering.
	User.find({}, (err, users) => {
		if (err) {
			res.render('index', {err: err})
		} else {
			console.log(users);
			res.render('index', {"users": users})
		}
	})
})
// Add User Request 


app.post('/users', function (req, res) {
	console.log("POST DATA", req.body);
	// create a new User with the name and age corresponding to those from req.body
	var user = new User({
		name: req.body.name,
		age: req.body.age
	});
	// Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
	user.save(function (err) {
		// if there is an error console.log that something went wrong!
		if (err) {
			console.log('something went wrong');
		} else { // else console.log that we did well and then redirect to the root route
			console.log('successfully added a user!');
		}
		res.redirect('/');
	})
})


// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
	console.log("listening on port 8000");
})