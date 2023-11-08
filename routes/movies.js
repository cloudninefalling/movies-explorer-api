const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { linkRegex } = require('../constants/regex');

router.get('/', getSavedMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(new RegExp(linkRegex)),
      trailerLink: Joi.string().required().regex(new RegExp(linkRegex)),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().regex(new RegExp(linkRegex)),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
