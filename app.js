require('dotenv').config();

const express = require('express');
const compression = require('compression');
const app = express();

const LONG_CACHE_MS = 1000 * 60 * 60 * 24 * 30;
const IMMUTABLE_CACHE_CONTROL = 'public, max-age=2592000, immutable';
const STATIC_CACHEABLE_EXTENSIONS = /\.(?:css|js|mjs|json|map|png|jpe?g|gif|webp|svg|ico|mp3|wav|ogg|m4a|mp4|webm|woff2?|ttf|eot|geojson)$/i;

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

function setLongCacheHeaders(res, filePath) {
  if (STATIC_CACHEABLE_EXTENSIONS.test(filePath)) {
    res.setHeader('Cache-Control', IMMUTABLE_CACHE_CONTROL);
  }
}

app.disable('x-powered-by');
app.use(compression({
  threshold: 1024,
  filter: shouldCompress
}));
app.use(express.static('public', {
  maxAge: LONG_CACHE_MS,
  immutable: true,
  setHeaders: setLongCacheHeaders
}));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\nServer has started on Port ${PORT}. Time: ${currentTime}`);
});

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling'],
  httpCompression: {
    threshold: 1024
  },
  perMessageDeflate: {
    threshold: 1024
  }
});

const router = require('./router')(app, io, db);

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