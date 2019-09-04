const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('express-flash');

mongoose.connect('mongodb://localhost/Message-Board');
mongoose.Promise = global.Promise;
app.use(bodyParser.json()); // to send as json
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');
app.use(flash());
app.use(express.static(__dirname + '/public/dist/public'));
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

// --------------------------------------------------------------------
// Schemas
// --------------------------------------------------------------------

// ------------------------- task Schema --------------------------

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '',
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');
module.exports = {Task}

// --------------------------------------------------------------------
// controllers
// --------------------------------------------------------------------

// const tasks = require('./../controllers/tasks'); if modularized

// module.exports = function (app) {
//     app.get('/tasks', (req, res) => {
//         Task.find({}, (err, data) => {
//             if (err) {
//                 res.json({
//                     'status': 'fail',
//                     err: err
//                 });
//             } else {
//                 res.json({
//                     'Tasks': data,
//                     status: 'success'
//                 })
//             }
//         })
//     })
// }

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

app.get('/tasks', (req, res) => {
    Task.find({}, function (err, all_tasks) {
        if (err) {
            console.log("Returned error", err);
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success",
                data: all_tasks
            })
        }
    })
})

app.post('/tasks', (req, res) => {
    Task.create(req.body, (err, new_task) => {
        if (err) {
            console.log("Create was unsuccesful")
            res.json({
                message: "Error",
                error: err
            })
        } else {
            console.log(new_task)
            res.json({
                message: "Success",
                data: new_task
            })
        }
    })
})

app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err) {
            console.log("")
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success"
            })
        }
    })
})

app.get('/tasks/:id', (req, res) => {
    Task.findOne({
        _id: req.params.id
    }, (err, task) => {
        if (err) {
            console.log("Error finding task")
            res.json({
                message: "Error",
                error: err
            })
        } else {
            console.log(task)
            res.json({
                message: "Success",
                data: task
            })
        }
    })
})

app.put("/tasks/:id", (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.id
    }, req.body, (err, task) => {
        if (err) {
            console.log("Error finding task")
            res.json({
                message: "Error",
                error: err
            })
        } else {
            console.log(task)
            res.json({
                message: "Successful delete",
                data: task
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
