var express = require("express");
var session = require("express-session");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: 'keyboardkitteh',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000
	}
}))

// app.use(express.static(__dirname + "/static"));
app.set('views', path.join(__dirname, './views'));

// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	console.log("I'm working!");
	res.render('index');
});

app.post('/result', function(req, res){
	var info = req.body;
	res.render('result', {results: info});
});

app.listen(8000, function () {
	console.log("listening on port 8000");
})