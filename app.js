// Basic Need Import

const express = require ('express');
const router = require("./src/routes/api");
const bodyParser = require('body-parser');

// Object Create of Express

const app = new express();

// Security Middleware Import

const rateLimit = require ('express-rate-limit');
const helmet = require ('helmet');
const mongoSanitize= require('express-sanitizer');
const xss= require('xss-clean');
const hpp= require('hpp');
const cors= require('cors');
const mongoose= require('mongoose');

// Security Middleware Implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(bodyParser.json());


// Request Rate Limiting

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:1000
})
app.use(rateLimiter);

// Mongo DB Database Connection

const URI = "mongodb://127.0.0.1:27017/todo-list-express-api";
const OPTION = { user: '', pass: '', autoIndex: true };

mongoose.connect(URI, OPTION).then((res) => {
    console.log('Connection successful');
}).catch((err) => {
    console.log(err);
});

// Routing Implement

app.use('/api/v1',router);

// Undefined Route

app.use('*',(req,res) => {

    res.status(404).json({
        status:'404',
        data:"No Api Found"
    })

});

module.exports = app;