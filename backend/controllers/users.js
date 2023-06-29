const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const wrapper = require('./wrapper');
const {
  CREATE,
  SUCCESS,
  UNAUTHORIZED
} = require('../constants/ErrorStatuses');

const SALT_ROUNDS = 10;
const { SECRET_KEY = 'some-secret-key' } = process.env;

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
    wrapper(() => User.create({
      name, about, avatar, email, password: hash
    }), CREATE)(req, res);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' }
      );
      res.status(SUCCESS).send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

const getUsers = wrapper(() => User.find({}));

const getUser = wrapper((req) => {
  const currentUserId = req.user._id;

  return User.findOne({ _id: currentUserId });
});

const getUserId = wrapper((req) => User.findById(req.params._id));

const updateUser = wrapper((req) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  );
});

const updateUserAvatar = wrapper((req) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true }
  );
});

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateUserAvatar
};
