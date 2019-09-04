const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WeatherAPI');
mongoose.Promise = global.Promise;
app.use(bodyParser.json()); // to send as json
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public/dist/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// --------------------------------------------------------------------
// Schemas
// --------------------------------------------------------------------



// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// --------------------------------------------------------------------
// 404 and app.listen 
// --------------------------------------------------------------------

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
    response.send("404")
});