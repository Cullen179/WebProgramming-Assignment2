// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Do Tung Lam 
//         Hoang Nguyen Nhat Minh
//         Loi Gia Long 
//         Ngo Ngoc Thinh
//         Vu Tuan Linh
// ID:     Do Tung Lam (s3963286)
//         Hoang Nguyen Nhat Minh (s3977856)
//         Loi Gia Long (s3758273)
//         Ngo Ngoc Thinh (s3879364)
//         Vu Tuan Linh (s3927502)
// Acknowledgement: 
// Bootstrap documentation: https://getbootstrap.com/ 
// Bootstrap icon: https://icons.getbootstrap.com/
// Google icon: https://fonts.google.com/icons
// Pexels: https://www.pexels.com/
// Canva: https://www.canva.com/

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
const flash = require('connect-flash');

var methodOverride = require('method-override');

const app = express();
const route = require('./server/routes/router');
const { json } = require('body-parser');

/**
 * -------------- GENERAL SETUP ----------------
 */

app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')));
app.use('/bootstrap', express.static(path.resolve(__dirname, 'node_modules/bootstrap')));

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

// Method override
app.use(methodOverride('_method'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

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
app.use(flash());
/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require('./authentication/passport-config.js');
app.use(passport.initialize());
app.use(passport.session());

// Authentication debugger
app.use((req, res, next) => {
  // console.log(req.session);
  // console.log(req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */
// Render views
app.use('/', route);

app.listen(3000, () => {
  console.log(`Server is running at localhost:${PORT}`);
});
