var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static/"));

app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');


app.get('/cars', function(request, response) {
	console.log("test");
	response.render('cars')
})
app.get('/cats', function(request, response) {
	console.log("test");
	response.render('cats')
})
app.get('/form', function(request, response) {
	console.log("test");
	response.render('form')
})

app.get("/kitnap", function (request, response){
    var kitnap = {
		name: "kitnap", 
		food: ["porkchop", "t-bone steak"],
		age: 2,
		sleepingspots: "kitchen"
	};
    response.render('details', {cat: kitnap });
})

app.get("/helloninja", function (request, response){
    var helloninja = {
		name: "Hello Ninja", 
		food: ["goodbye-popcorn", "ninja fish"], 
		age: 102,
		sleepingspots: "the bahamas!"
	};
    response.render('details', {cat: helloninja });
})


app.listen(8000, function() {
	console.log("listening on port 8000");
})



