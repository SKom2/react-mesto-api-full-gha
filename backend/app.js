require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const { CONNECT_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb', PORT = 3000 } = process.env;

mongoose.set('toJSON', { useProjection: true });
mongoose.connect(CONNECT_ADDRESS);
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  next();
});
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});
app.use(express.json());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
});
app.use(router);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
