// External imports
const dotenv = require('dotenv');
dotenv.config();


// Internal imports
const app = require('./app');
const connectDatabase = require('./src/db/server');

const port = process.env.PORT || 5000


// App listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    // connect to database
    connectDatabase();
});
