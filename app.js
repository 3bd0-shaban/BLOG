const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session')
const morgan = require('morgan');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const Post = require('./models/posts')

const port = 3000;
app.use(morgan('dev'));
app.use(morgan('tiny'));
app.use(cors());
const { check, validationResult } = require('express-validator');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));



require('./config/passport')(passport);

// mongoose connect to database
mongoose
    .connect(
        // "mongodb+srv://3bdo:0777888999@cluster0.6pmbd.mongodb.net/all-data?retryWrites=true&w=majority"
        "mongodb+srv://3bdo:0123456@cluster0.44br3.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((result) => {
        app.listen(port, () => {
            console.log('Run Successfully at http://localhost:3000');
        })
    })
    .catch((err) => { console.log(err); })
    .then(result => {
        // app.listen(3000);
    })
app.use(cookieParser('NotSoSecret'));
app.use(session({
    name: 'sessionId',
    secret: "mysecretkeythatiwillnottellyou",
    saveUninitialized: false, // don't create sessions for not logged in users
    resave: false, //don't save session if unmodified
    cookie:{maxAge :1000 * 60 * 60 * 24}
}));
// Connect flash
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use('/', require('./routes/route'));
app.use('/', require('./routes/posts'));
app.use('/', require('./routes/usersregister'));



app.use(function (req, res) {
    res.status(404).send("Sorry Not Found");
})
// app.post('/delete/:id', (req, res) => {
//     console.log("hello000000000000000000000000000000000000000000000000000000000000000000000000");
//     Post.findByIdAndDelete(req.params.id);
// });
