const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const flash = require('express-flash');

app.use(session({
    secret: "Don't forget about us!",
	saveUninitialized: true,
	cookie: {
        maxAge: 60000
	}
}))

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(flash());

require('./server/models/quote.js')
require('./server/config/routes.js')(app)
