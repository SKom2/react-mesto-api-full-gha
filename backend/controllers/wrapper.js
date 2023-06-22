const mongoose = require('mongoose');
const {
  NOT_FOUND,
  SUCCESS,
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR
} = require('../constants/ErrorStatuses');

const MONGO_DUPLICATE_KEY_ERROR = 11000;

const wrapper = (handler, successStatus = SUCCESS) => (req, res) => {
  handler(req, res)
    .then((result) => {
      if (!result) {
        res.status(NOT_FOUND).send({ message: 'Card Id not found' });
        return;
      }
      res.status(successStatus).send(result);
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        res.status(CONFLICT).send({ message: 'This user already exists' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send({ message: 'Invalid User Id' });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({
          message: 'Incorrect data sent'
        });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'An error occurred on the server',
        stack: err.stack
      });
    });
};

module.exports = wrapper;
