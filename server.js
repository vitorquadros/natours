const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./src/routes/tourRoutes');
const userRouter = require('./src/routes/userRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/tours', userRouter);

app.listen(3000, () => {
  console.log('Running...');
});
