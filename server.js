const connectDB = require("./server/database/connection");
const express = require("express");
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const bodyparser = require("body-parser");

const app = express();
const route = require('./server/routes/router');

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;

// Log request
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Set up views
app.set('view engine', 'ejs');

// Render views
app.use('/', route);

// Parse request to request.body
app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000, () => {console.log(`Server is running ${PORT}`)})