const router = require('express').Router();
const {
  validateDeleteMovie,
  validatePostMovie,
} = require('../validators/movies');
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', validatePostMovie, createMovie);
router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
