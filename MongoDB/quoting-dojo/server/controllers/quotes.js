const mongoose = require('mongoose')
const Quote = mongoose.model('Quote')
mongoose.Promise = global.Promise;



module.exports = {
    index: function(req, res) {
        res.render('index');
    },
    create: function(req, res) {
        console.log("POST DATA", req.body);
        var quote = new Quote({
            name: req.body.name,
            quote: req.body.quote
        }, {
            timestamps: req.body.createdAt
        })
        Quote.save(function (err) {
            if (err) {
                console.log('something went wrong');
                console.log(err.errors);
                for (var key in err.errors) {
                    req.flash('reg', err.errors[key].message);
                }
                res.redirect('/');
            } else {
                console.log('successfully added a quote!');
                res.redirect('/quote')
            }
        });
    },
    findAll: function(req, res) {
    	Quote.find({}, (err, quote_results) => {
            if (err) {
                console.log("Error finding quotes")
                res.render("quotes", {
                    err: err
                })
            } else {
                console.log(quote_results)
                res.render("quotes", {
                    quotes: quote_results
                })
            }
        })
    }
};