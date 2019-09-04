var express = require("express");
var session = require("express-session");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: 'keyboardkitteh',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000
	}
}))

app.use(express.static(__dirname + "/static"));
app.set('views', path.join(__dirname, './views'));

// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	console.log("I'm working!");
	var results = req.body;
	res.render('index', {results:results});
});

var server = app.listen(8000, function () {
	console.log("listening on port 8000");
})

// ----------------------------------------------------------

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	socket.on("posting_form", function (results) {
		socket.emit("random_number", {
			random_number: Math.floor(Math.random() * 1000) + 1
		});
		console.log("You emitted the following information to the server: " + results.name + " " + results.location + " " + results.language + " " + results.comment)
		socket.emit("updated_message", {
			response: results
		});
	})
})