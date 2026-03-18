require('dotenv').config();

var express = require('express');
var app = express();

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chatdb';
const SESSION_SECRET = process.env.SESSION_SECRET || 'work hard';

var date = new Date();
var currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

mongoose.connect(MONGODB_URI);
var db = mongoose.connection;

db.on('error', function (err) {
  console.error('MongoDB connection error:', err);
});

db.once('open', function () {
  console.log('Connected to MongoDB');
});

var server = app.listen(PORT, '0.0.0.0', function () {
  console.log('\nServer has started on Port ' + PORT + '. Time: ' + currentTime);
});

var io = require('socket.io').listen(server);
var router = require('./router')(app, io, db);

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  },
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);