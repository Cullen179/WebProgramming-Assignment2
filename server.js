const connectDB = require('./server/database/connection');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const bodyparser = require('body-parser');

const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');

const app = express();
const route = require('./server/routes/router');
const { json } = require('body-parser');

/**
 * -------------- GENERAL SETUP ----------------
 */

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/images', express.static(path.resolve(__dirname, "assets/images")));

app.use(bodyparser.json());
// Parse request to request.body
app.use(bodyparser.urlencoded({ extended: true }));

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// Log request
app.use(morgan('tiny'));

// MongoDB connection
const connection = connectDB();

// Set up views
app.set('view engine', 'ejs');

/**
 * -------------- SESSION SETUP ----------------
 */
const mongoDBSessionStorage = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  collection: 'sessions',
});
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: mongoDBSessionStorage,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require('./authentication/passport-config.js');
app.use(passport.initialize());
app.use(passport.session());

// Authentication debugger
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */
// Render views
app.use('/', route);

/**
 * -------------- ERROR HANDLING ----------------
 * Can be separated to another file
 */
// app.use((err, req, res, next) => {
//   if (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

app.listen(3000, () => {
  console.log(`Server is running ${PORT}`);
});
