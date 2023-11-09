const router = require('express').Router();
const { validateCreateUser, validateLogin } = require('../validators/users');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.get('/signout', auth, logout);
router.use((req, res, next) => {
  next(new NotFoundError('This route does not exist'));
});

module.exports = router;
