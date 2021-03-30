const Tour = require('../models/TourModel');

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (name && price) {
    next();
  } else {
    return res.status(400).json({
      status: 'bad request',
      message: 'missing data',
    });
  }
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  // const tour = tours.find((el) => el.id === Number(id));
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(500).json({
    message: 'This route is not yet defined!',
  });
};

exports.deleteTour = (req, res) => {
  res.status(500).json({
    message: 'This route is not yet defined!',
  });
};
