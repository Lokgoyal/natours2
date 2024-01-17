const express = require('express');
const authController = require('./../controllers/authController');



// Init Application instance (router)
const router = express.Router();



// Mount routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);



// Export router
module.exports = router;