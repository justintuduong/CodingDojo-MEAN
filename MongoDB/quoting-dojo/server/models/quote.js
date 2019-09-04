const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/Quote', { userNewURLParser: true });

var QuoteSchema = new mongoose.Schema({
    name: {
        type: String,
		required: true
	},
	quote: {
        type: String,
		required: true
	}
}, {
    timestamps: true
})
mongoose.model('Quote', QuoteSchema);