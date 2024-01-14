const express = require('express');
const tourRouter = require('./routes/tourRoutes');



// Init Application instance
const app = express();



// Mount middleware (General)
app.use(express.json());


// (Route-specific)
app.use('/api/v1/tours', tourRouter);



// Export app to server
module.exports = app;