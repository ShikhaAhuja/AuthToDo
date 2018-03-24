var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');
//var registrationLogin = require('./routes/registrationLogin');
var todoRoutes = require('./routes/todoRoutes');
//var jwtVerify = require('./routes/jwtVerfiy');

var port = process.env.PORT || 8000; // used to create , sign , and verify tokens
mongoose.connect(config.database);

//use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//use morgan to log requests to the console
app.use(morgan('dev'));

app.set('secret', config.secret);

//app.use('/',registrationLogin);
app.use('/todo',todoRoutes);

app.use(express.static(__dirname + '/dist'));
app.use((req,res) => res.sendFile(__dirname + '/dist/index.html'));

app.listen(port);
console.log("Use API routes http://localhost:" + port);