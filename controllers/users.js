const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-unused-expressions
require('dotenv').config;

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const removePassword = (user) => {
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash, name })
      .then((user) => {
        const userWithoutPassword = removePassword(user);
        res.send(userWithoutPassword);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Account with this email already exists'));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else next(err);
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const userWithoutPassword = removePassword(user);
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { maxAge: 604000000 }).send(userWithoutPassword);
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res
    .cookie('jwt', 'none', {
      maxAge: 5000,
      httpOnly: true,
      sameSite: true,
    })
    .status(200)
    .send();
};

module.exports.getUser = (req, res, next) => {
  const id = req.userId;
  User.findById(id)
    .then((user) => {
      if (!user) throw new NotFoundError('user not found');
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('user not found'));
      } else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.userId,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else next(err);
    });
};
