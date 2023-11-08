/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError('Authorization required'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-movies',
    );
  } catch (err) {
    next(new AuthError('Authorization required'));
  }
  req.userId = payload._id;
  next();
};
