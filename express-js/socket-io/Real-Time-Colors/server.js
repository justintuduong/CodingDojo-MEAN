var express = require("express");
var session = require("express-session");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var color = ["bg-success", "bg-primary", "bg-danger"];
var addColor;


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
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	console.log("step 2");
	res.render('index', {color:color});
});

var server = app.listen(7000, function () {
	console.log("listening on port 8000");
})

// ----------------------------------------------------------

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	socket.on('green', function () {
		addColor  = color[0];
		console.log( addColor);
		io.emit("bg-color", addColor);
	})

	socket.on('blue', function () {
		addColor  = color[1];
		io.emit("bg-color", addColor);
	})

	socket.on('red', function () {
		addColor  = color[2];
		io.emit("bg-color", addColor);
	})
})