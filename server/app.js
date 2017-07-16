//Imports
const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const mongo         = require('mongodb');
const mongoose      = require('mongoose');
const passport      = require('passport');
const jwt           = require('passport-jwt');
const cors          = require('cors');
const config        = require('./config/database');

//initialize App
var app = express();

//Setting port
var port = 3000;

//initialize cors
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname,'../client/src/')));

//initialize body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//mongoose.Promise = require('bluebird');
//connection to DB
mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database' + config.database);
});

mongoose.connection.on('error', function (err) {
    console.log('Database error' + err);
});

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Models
var Category    = require('./models/category');
var Post        = require('./models/post');
var User        = require('./models/user');

//Routes
var categoryRouter  = require('./routes/categories')(Category);
var postRouter      = require('./routes/posts')(Post);
var userRouter      = require('./routes/users')(User);

//Initialize routes
app.use('/api/categories', categoryRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

//Root route
app.get('/', function(req,res) {
    res.send('Welcome to my API');
});

//Listen to port
app.listen(port, function () {
    console.log('Server is running on port: ' + port);
});