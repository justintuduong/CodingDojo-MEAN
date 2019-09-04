var express = require("express");
var app = express();
app.get('/', function(request, response) {
})

app.listen(8000, function() {
	console.log("listening on port 8000");
})
app.use(express.static(__dirname + "/static/"));
app.set('views', __dirname + '/views');
