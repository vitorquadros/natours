const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, value) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'not found',
      message: 'invalid id',
    });
  }
  next();
};

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
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === Number(id));
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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