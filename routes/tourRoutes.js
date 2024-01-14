const express = require('express');
const tourController = require('./../controllers/tourController');



// App instance (router)
const router = express.Router();



// Mount routes (Analytical)
router.get('/monthly-plan/:year', tourController.monthlyPlan);
router.get('/stats', tourController.tourStats);
router.get('/top-5-tours', tourController.aliasTopTours, tourController.getAllTours);


// Mount routes (CRUD)
router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);



// Export router to app
module.exports = router;