const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validatePatchUser } = require('../validators/users');

router.get('/me', getUser);
router.patch('/me', validatePatchUser, updateUser);

module.exports = router;
