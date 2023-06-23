const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/ErrorStatuses');
require('dotenv').config();

const { SECRET_KEY = 'some-secret-key' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Authorization required' });
  }

  req.user = payload;

  return next();
};

module.exports = auth;
