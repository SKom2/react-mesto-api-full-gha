const mongoose = require('mongoose');
const {
  SUCCESS
} = require('../constants/ErrorStatuses');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-error');
const BadRequest = require('../errors/bad-request-err');

const MONGO_DUPLICATE_KEY_ERROR = 11000;

const wrapper = (handler, successStatus = SUCCESS) => (req, res, next) => {
  handler(req, res)
    .then((result) => {
      if (!result) {
        next(new NotFoundError('Card Id not found'));
        return;
      }
      res.status(successStatus).send(result);
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        next(new ConflictError('This user already exists'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Invalid User Id'));
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Incorrect data sent'));
      }
    });
};

module.exports = wrapper;
