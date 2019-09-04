const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/Message-Board');
mongoose.Promise = global.Promise;
app.use(bodyParser.json()); // to send as json
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');
app.use(flash());

app.use(session({
	secret: 'GET IN MAH BELLY!',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000
	}
}))

app.use(bodyParser.urlencoded({
	extended: true
}));

// --------------------------------------------------------------------
// Schemas
// --------------------------------------------------------------------

// ------------------------- User Schema --------------------------

var PeopleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name must be at least 2 characters long."]
	},
}, {
	timestamps: true
})
mongoose.model('People', PeopleSchema);
var People = mongoose.model('People');

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

app.get('/', (req, res) => {
	People.find({}, function (err, all_people) {
		if (err) {
			console.log("Returned error", err);
			// respond with JSON
			res.json({
				message: "Error",
				error: err
			})
		} else {
			// respond with JSON
			res.json({
				message: "Success",
				data: all_people
			})
		}
	})
})

app.get('/new/:name/', (req, res) => {
	People.create({name: req.params.name}, (err, new_person) =>{
		if (err) {
			console.log("Create was unsuccesful")
			res.json({message: "Error", error: err})
		} else {
			console.log(new_person)
			res.json({message: "Success", data: new_person})
		}
	})
})

app.get('/remove/:name/', (req, res)=> {
	People.deleteOne({name: req.params.name}, (err) => {
		if (err) {
			console.log("")
			res.json({message: "Error", error: err})	
		}else {
			res.json({message: "Success"})
		}
	})
})

app.get('/:name', (req, res)=> {
	People.findOne({name: req.params.name}, (err, person)=> {
		if (err) {
			console.log("Error finding Person")
			res.json({message: "Error", error: err})
		}else {
			console.log(person)
			res.json({message: "Success", data: person})
		}
	})
})


// --------------------------------------------------------------------
// 404 and app.listen 
// --------------------------------------------------------------------

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
	response.send("404")
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
	console.log("listening on port 8000");
})



// -----------------------------------------------------------------

