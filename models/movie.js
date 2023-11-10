const mongoose = require('mongoose');
const { linkRegex } = require('../constants/regex');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (v) => linkRegex.test(v),
      message: 'must be a valid link',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => linkRegex.test(v),
      message: 'must be a valid link',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v) => linkRegex.test(v),
      message: 'must be a valid link',
    },
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
