const express = require('express');



// Init Application instance
const app = express();



// Mount middleware (General)
app.use(express.json());


// (Route-specific)
// app.use('/api/v1/tours');



// Export app to server
module.exports = app;