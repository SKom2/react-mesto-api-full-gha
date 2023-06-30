const { INTERNAL_SERVER_ERROR } = require('../constants/ErrorStatuses');

class InternalServerErr extends Error {
  constructor(message, stack) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR;
    Error.captureStackTrace(this, InternalServerErr);
  }
}

module.exports = InternalServerErr;
