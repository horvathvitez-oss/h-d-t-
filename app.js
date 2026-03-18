require('dotenv').config();

const express = require('express');
const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chatdb';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret';

const date = new Date();
const currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

const db = mongoose.connection;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\nServer has started on Port ${PORT}. Time: ${currentTime}`);
});

const io = require('socket.io')(server);

const router = require('./router')(app, io, db);

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URI
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);