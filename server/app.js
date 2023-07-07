// External imports
const express = require('express');	//@TODO: install this packages to use 
const cors = require('cors');	//@TODO: install this packages to use 
const cookieParser = require('cookie-parser')
const { readdirSync } = require("fs");
const path = require("path");


//Security Middleware Import
const rateLimit = require('express-rate-limit');	//@TODO: install this packages to use 
const helmet = require('helmet');	//@TODO: install this packages to use 
const mongoSanitize = require('express-mongo-sanitize');	//@TODO: install this packages to use 
const hpp = require('hpp');	//@TODO: install this packages to use 
const morgan = require('morgan'); //@TODO: install this packages to use 



// express app initialization
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Security middleware initialization
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(morgan('dev'));


//Request Rate Limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);


// Routing middleware initialization
readdirSync('./src/routes').map(r => app.use(`/api/v1`, require(`./src/routes/${r}`)));



// module exports
module.exports = app;