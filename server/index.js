// External imports
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();


// Internal imports
const app = require('./app');
const connectDatabase = require('./src/db/server');

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    connectDatabase()
});
