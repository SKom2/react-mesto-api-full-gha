const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateUserAvatar
} = require('../controllers/users');
const {
  validateUserEdit,
  validateUserAvatarEdit,
  validUserId
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:_id', validUserId, getUserId);
router.patch('/me', validateUserEdit, updateUser);
router.patch('/me/avatar', validateUserAvatarEdit, updateUserAvatar);

module.exports = router;
