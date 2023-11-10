const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

module.exports.getSavedMovies = (req, res) => {
  const id = req.userId;
  Movie.find({ owner: id }).then((movie) => {
    res.send(movie);
  });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.userId,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate('owner')
    .then((movie) => {
      if (!movie) throw new NotFoundError('Movie not found');
      if (!movie.owner._id.equals(req.userId)) {
        throw new ForbiddenError('This movie is not in your collection');
      }
      movie.deleteOne().then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Movie not found'));
      } else next(err);
    });
};
