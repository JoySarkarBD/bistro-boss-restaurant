// External imports
const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose?.connect(process.env.DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.error('MongoDB connection error', err);
    });
}


module.exports = connectDatabase;