const dotenv = require('dotenv');
dotenv.config({ path : `${__dirname}/config.env` });

const app = require('./app');
const mongoose = require('mongoose');



// Database connection
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASS);
mongoose.connect(DB, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false
}).then( con => console.log(`Database connected ✅`));



// Deployment
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`${process.env.NODE_ENV} Server started on port: ${port} ✅`));