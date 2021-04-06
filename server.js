const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  // in case of a uncaught expection, is essential that the server shut down
  console.log('Uncaught Exception! Shutting down..');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

// MONGODB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// ROUTES
const app = require('./app');

// STARTING SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Running on ${process.env.NODE_ENV} mode...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down..');
  console.log(err.name, err.message);

  server.close(() => {
    // closing the server before exiting the process to finish reqs running
    process.exit(1);
  });
});
