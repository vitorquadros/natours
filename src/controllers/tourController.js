const Tour = require('../models/TourModel');

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

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent!',
    });
  }
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
