const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/Message-Board');
mongoose.Promise = global.Promise;

app.use(session({
	secret: 'GET IN MAH BELLY!',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000
	}
}))

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(flash());

// --------------------------------------------------------------------
// Schemas
// --------------------------------------------------------------------

// ------------------------- Post Schema --------------------------

var CommentSchema = new mongoose.Schema({
	commenter: {
		type: String,
		required: [true, "Name must be at least 2 characters long."]
	},
	comment_content: {
		type: String,
		required: [true, "Comment can not be empty and must be at least 3 characters long."]
	},
}, {
	timestamps: true
})
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

// ------------------------- Message Schema --------------------------

var MessageSchema = new mongoose.Schema({
	messager: {
		type: String,
		required: [true, "Name must be at least 2 characters long."]
	},
	message_content: {
		type: String,
		required: [true, "Message can not be empty and must be at least 3 characters long."]
	},
	comments: [CommentSchema]
}, {
	timestamps: true
})
mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

app.get('/', (req, res) => {
	console.log('root route');
	Message.find({}, function (err, all_messages) {
		if (err) {
			console.log("Oops, messages are not found")
			res.render("index", {
				'err': err
			})
		} else {
			console.log(all_messages)
			res.render("index", {
				all_messages: all_messages
			})
		}
	})
})

app.post('/message/process', (req, res) => {
	console.log("POST DATA", req.body);
	Message.create(req.body, (err, data) => {
		if (err) {
			console.log("Message was NOT successful!")
			for (var key in err.errors) {
				req.flash('reg', err.errors[key].message)
			}
			res.redirect('/')
		} else {
			console.log("Message was succesful!")
			var all_messages = Message.find({ $query: {}, $orderby: { createdAt : -1} })
			console.log("Here are all the messages" + all_messages)
			res.redirect('/')
		}
	})
})

app.post('/comment/process', (req, res) => {
	console.log("POST DATA", req.body);
	Comment.create(req.body,function (err, data) {
		if (err) {
			console.log("Comment was NOT successful!")
			for (var key in err.errors) {
				req.flash('reg', err.errors[key].message)
			}
			res.redirect('/')
		} else {
			Message.findOneAndUpdate({_id: req.body.id}, {$push: {comments: data}}, function(err,data){
				if (err) {
					console.log("Comment was NOT successfully added to message array!")
					res.redirect('/')
				} else {
					console.log("Comment was succesful!")
					// var all_comments = Comment.find({})
					// console.log("Here are all the messages" + all_comments)
					res.redirect('/')
				}
			})
		}
	})
})







// --------------------------------------------------------------------
// 404 and app.listen 
// --------------------------------------------------------------------

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
	response.send("404")
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
	console.log("listening on port 8000");
})



// -----------------------------------------------------------------
