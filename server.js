const connectDB = require("./server/database/connection");
const express = require("express");
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const bodyparser = require("body-parser");

const app = express();

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;

// Log request
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Parse request to request.body
app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000, () => {console.log(`Server is running ${PORT}`)})