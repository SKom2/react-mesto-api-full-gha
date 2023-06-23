require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const { CONNECT_ADDRESS, PORT } = process.env;

mongoose.set('toJSON', { useProjection: true });
mongoose.connect(CONNECT_ADDRESS);
const app = express();

const allowedCors = [
  'http://api.mesto-otdiha.nomoredomains.work'
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

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
app.use(router);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
