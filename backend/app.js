require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const { CONNECT_ADDRESS, PORT } = process.env;

mongoose.set('toJSON', { useProjection: true });
mongoose.connect(CONNECT_ADDRESS);
const app = express();

app.use(express.json());
app.use(router);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
