var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var flash = require('express-flash');
mongoose.connect('mongodb://localhost/Mongoose-Dashboard');
mongoose.Promise = global.Promise;

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
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(flash());

// --------------------------------------------------------------------
// Schemas
// --------------------------------------------------------------------

var AnimalSchema = new mongoose.Schema({
	species: {
		type: String,
		required: true
	},
	favorite_food: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

app.get('/', (req, res) => { //displays all mongooses
	console.log('root route');
	Animal.find({}, (err, animals) => {
		if (err) {
			console.log("error while searching db")
			res.render('index', {
				err: err
			})
		} else {
			console.log(animals);
			res.render('index', {
				results: animals
			});
		};
	})
})

app.get('/mongooses/new', (req, res) => { // adds new animal to db
	res.render('new')
});

app.post('/mongooses/new/process', (req, res) => { // processes add and redirects to show
	console.log("POST DATA", req.body);
	var animal = new Animal({
		species: req.body.species,
		favorite_food: req.body.favorite_food
	}, {
		timestamps: req.body.createdAt
	});
	animal.save(function (err) {
		if (err) {
			console.log('something went wrong');
			console.log(err.errors);
			for (var key in err.errors) {
				req.flash('reg', err.errors[key].message);
			}
			res.redirect('/mongooses/new');
		} else {
			console.log('successfully added species to db!');
			res.redirect('/')
		}
	});
})

app.get('/mongooses/:id', (req, res) => { //displays 1 mongoose
	console.log(req.params.id);
	Animal.find({
		_id: (req.params.id)
	}, (err, animals) => {
		if (err) {
			console.log("error while searching db")
			res.render('index', {
				err: err
			})
		} else {
			console.log("this is the object" + animals);
			res.render('show', {
				results: animals
			})
		}
	})
});

app.get('/mongooses/edit/:id', (req, res) => { // edits animal data
	Animal.find({
		_id: (req.params.id)
	}, (err, animals) => {
		if (err) {
			console.log("error while searching db")
			res.render('index', {
				err: err
			})
		} else {
			console.log("this is the object" + animals);
			res.render('edit', {
				results: animals
			})
		}
	})
})

app.post('/mongooses/edit/process/', (req, res) => { // processes edit and redirects to show if correct
	// console.log("POST DATA", req.body);
	var update = {
		species: req.body.species,
		favorite_food: req.body.favorite_food,
		updatedAt: Date.now()
	}
	Animal.findByIdAndUpdate(req.body.id, update, (err, animals) => {
		if (err) {
			console.log('something went wrong');
			for (var key in err.errors) {
				req.flash('reg', err.errors[key].message);
			}
			res.redirect('/mongooses/edit/:id');
		} else {
			console.log('successfully updated species to db!');
			res.redirect('/')
		}
	})
});

app.get('/mongooses/destroy/:id', (req, res) => { // deletes animal from db
	console.log(req.params.id)
	Animal.remove({
		_id: req.params.id
	}, (err) => {
		if (err) {
			console.log("I didn't remove anything, oops!")
			res.redirect('/')
		} else {
			res.redirect('/')
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