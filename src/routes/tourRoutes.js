const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.get('/:id', tourController.getTour);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

module.exports = router;
