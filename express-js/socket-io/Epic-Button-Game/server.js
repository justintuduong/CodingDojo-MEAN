var express = require("express");
var session = require("express-session");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var count = 0;

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
	console.log("I'm working!");
	var count = 0;
	res.render('index', {
		count: count
	});
});

var server = app.listen(8000, function () {
	console.log("listening on port 8000");
})

// ----------------------------------------------------------

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	socket.on('counter', function () {
		console.log(count);
		count++;
		io.emit("addingtocounter", count);
	})

	socket.on('reset', function(){
		count = 0;
		io.emit("addingtocounter", count);
	})
})