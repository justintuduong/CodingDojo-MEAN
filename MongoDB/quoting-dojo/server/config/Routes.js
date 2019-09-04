const path = require('path');
// const mongoose = require('mongoose')
// const Quote = mongoose.model('Quote')
const process = require('../controllers/quotes.js')

module.exports = function (app) {

    app.get('/', (req, res) => {
        process.index(req, res); 
        // res.render('index');
    })

    app.post('/quote/process', (req, res) => {
        process.create(req, res);
    });

    app.get('/quote', function (req, res) {
        process.findAll(req, res);
    })

    //The 404 Route (ALWAYS Keep this as the last route)
    app.get('*', function (request, response) {
        response.send("404")
    });

    // Setting our Server to Listen on Port: 8000
    app.listen(8000, function () {
        console.log("listening on port 8000");
    })
}