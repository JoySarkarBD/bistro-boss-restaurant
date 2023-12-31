// External imports
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {readdirSync} = require("fs");
const path = require("path");


//Security Middleware Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');
const {notFoundHandler, errorHandler} = require("./src/middlewares/errorHandlerMiddleware");
const bodyParser = require('body-parser');

// express app initialization
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Security middleware initialization
app.use("*", cors({
    origin: true,
    credentials: true
}));

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(morgan('dev'));


//Request Rate Limiting
const limiter = rateLimit({
    windowMs: 60 * 1000, // authValidateMiddleware.js minutes
    max: 10, // limit each IP to 10 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

//static folder


// Routing middleware initialization
readdirSync('./src/routes').map(r => app.use(`/api/v1`, require(`./src/routes/${r}`)));


// not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// module exports
module.exports = app;