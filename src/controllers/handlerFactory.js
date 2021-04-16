const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      message: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // will return the new document
      runValidators: true, // run the model validators again
    });

    if (!newDoc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });
